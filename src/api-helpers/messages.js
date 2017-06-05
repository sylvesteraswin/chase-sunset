import config from 'config';
const SERVER_URL = process.env.SERVER_URL
  ? process.env.SERVER_URL
  : config('serverUrl');

// The get started button
const getStarted = {
  setting_type: 'call_to_actions',
  thread_state: 'new_thread',
  call_to_actions: [
    {
      payload: JSON.stringify({
        type: 'GET_STARTED',
      }),
    },
  ],
};

// Account Link button
const signInButton = {
  type: 'account_link',
  url: `${SERVER_URL}/users/login`,
};

// Message that informs the user the mush sign in and prompts
const createAccountMessage = {
  attachment: {
    type: 'template',
    payload: {
      template_type: 'button',
      text: 'Are you ready to travel?',
      buttons: [signInButton],
    },
  },
};

export default {
  getStarted,
  createAccountMessage,
};
