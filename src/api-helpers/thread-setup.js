import api from './api';
import messages from './messages';

const { callThreadAPI } = api;

const { getStarted } = messages;

// Sets the get started button for the application
const setGetStarted = () => {
  callThreadAPI(getStarted);
};

export default {
  setGetStarted,
};
