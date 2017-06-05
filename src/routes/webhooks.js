import express from 'express';
import config from 'config';

const router = express.Router();

router.get('/', (req, res) => {
  const WEBHOOK_TOKEN = process.env.WEBHOOK_TOKEN
    ? process.env.WEBHOOK_TOKEN
    : config('appSecretToken');
  if (
    req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === WEBHOOK_TOKEN
  ) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
});

export default router;
