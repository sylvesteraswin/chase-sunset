import express from 'express';
import config from 'config';

import receive from '../api-helpers/receive';

const router = express.Router();
const { handleReceiveMessage, handleReceivePostback } = receive;

router.get('/', (req, res) => {
  const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN
    ? process.env.WEBHOOK_TOKEN
    : config.get('appSecretToken');
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === WEBHOOK_TOKEN
  ) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    // eslint-disable-next-line no-console
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

// Subscribe to many different types of messages
router.post('/', (req, res) => {
  res.sendStatus(200);
  const data = req.body;

  if (data.object === 'page') {
    // Iternate over each entry
    data.entry.forEach(pageEntry => {
      // Iternate each messaging event and handle accordingly
      pageEntry.messaging.forEach(messagingEvent => {
        // eslint-disable-next-line no-console
        console.log({ messagingEvent });
        if (messagingEvent.message) {
          handleReceiveMessage(messagingEvent);
        } else if (messagingEvent.postback) {
          handleReceivePostback(messagingEvent);
        } else {
          // eslint-disable-next-line no-console
          console.log(
            `Webhook received unknow messagingEvent: ${messagingEvent}`,
          );
        }
      });
    });
  }
});

export default router;
