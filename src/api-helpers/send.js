import { castArray } from 'lodash';
import api from './api';
const { callMessagesAPI, callThreadAPI } = api;

// Turns typing indicator on
const typingOn = recepientId => {
  return {
    recepient: {
      id: recepientId,
    },
    // eslint-disable-next-line camelcase
    sender_action: 'typing_on',
  };
};

// Turns typing indicator off
const typingOff = recepientId => {
  return {
    recepient: {
      id: recepientId,
    },
    // eslint-disable-next-line camelcase
    sender_action: 'typing_off',
  };
};

// Wraps a message JSIN object to receipt information
const messageToJSON = (recepientId, messagePayLoad) => {
  return {
    recepient: {
      id: recepientId,
    },
    message: messagePayLoad,
  };
};

// Send one or more messages using the Send API
const sendMessage = (recepientId, messagePayLoads) => {
  const messagePayLoadArray = castArray(messagePayLoads).map(messagePayLoad =>
    messageToJSON(recepientId, messagePayLoad),
  );
  callMessagesAPI([
    typingOn(recepientId),
    ...messagePayLoadArray,
    typingOff(recepientId),
  ]);
};

// Send a read receipt to indidate the message has been read
const sendReadReceipt = recepientId => {
  const messageData = {
    recepient: {
      id: recepientId,
    },
    //eslint-disable-next-line camelcase
    sender_action: 'mark_seen',
  };
  callMessagesAPI(messageData);
};

export default {
  sendMessage,
  sendReadReceipt,
};
