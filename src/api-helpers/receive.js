import send from './send';
const { sendReadReceipt } = send;

/*
 * handleReceivePostback — Postback event handler triggered by a postback
 * action you, the developer, specify on a button in a template. Read more at:
 * developers.facebook.com/docs/messenger-platform/webhook-reference/postback
 */
const handleReceivePostback = (event = {}) => {
  const { sender: { id: senderId } = {}, postback: { payload } = {} } = event;
  const { type, data } = JSON.parse(payload);

  switch (type) {
    default:
      console.error(`Unknown Postback called: ${type}`);
      break;
  }
};

/*
 * handleReceiveMessage - Message Event called when a message is sent to
 * your page. The 'message' object format can vary depending on the kind
 * of message that was received. Read more at: https://developers.facebook.com/
 * docs/messenger-platform/webhook-reference/message-received
 */
const handleReceiveMessage = (event = {}) => {
  const { message, sender: { id: senderId } = {} } = event;
  // Send user a read receipt to confirm that the
  // bot has seen the message
  sendReadReceipt(senderId);
};

export default {
  handleReceivePostback,
  handleReceiveMessage,
};
