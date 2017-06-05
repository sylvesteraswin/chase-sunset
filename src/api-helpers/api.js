import request from 'request';
import config from 'config';
import { castArray, isEmpty } from 'lodash';

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN
  ? process.env.PAGE_ACCESS_TOKEN
  : config.get('pageAccessToken');

/**
 * Send messages in order to the Facebook graph API
 * @param {*} endPoint -endpoint to send data to
 * @param {*} messageDataArray - Payloads to send individually
 * @param {*} queryParams - Query parameters
 * @param {*} retries # of times to attempt to send a message
 */
const callAPI = (endPoint, messageDataArray, queryParams = {}, retries = 5) => {
  // Error if endpoint is not specified
  if (!endPoint) {
    // eslint-disable-next-line no-console
    console.error(`callAPI required you specify an endpoint.`);
    return;
  }

  // Error if out of retries
  if (retries < 0) {
    // eslint-disable-next-line no-console
    console.error(
      `No more retries left. ${endPoint}, ${messageDataArray}, ${queryParams}`,
    );
    return;
  }

  // Ensure query parameters have a PAGE_ACCESS_TOKEN value
  const query = Object.assign({
    //eslint-disable-next-line camelcase
    access_token: PAGE_ACCESS_TOKEN,
  });

  // ready the first message in the array for send
  const [messageToSend, ...queue] = castArray(messageDataArray);
  request(
    {
      uri: `https://graph.facebook.com/v2.6/me/${endPoint}`,
      qs: query,
      method: 'POST',
      json: messageToSend,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        // Message successfully received
        // eslint-disable-next-line no-console
        console.log(
          `Successfully sent message to ${endPoint} endpoint: `,
          JSON.stringify(body),
        );

        // Continue reading payloads until queue empty
        if (isEmpty(queue)) {
          callAPI(endPoint, queue, queryParams);
        }
      } else {
        // Message not been successfully received
        // eslint-disable-next-line no-console
        console.error(
          `Failed calling Messenger API endpoint ${endPoint}`,
          response.statusCode,
          response.statusMessage,
          body.error,
          queryParams,
        );

        // Retry the request
        // eslint-disable-next-line no-console
        console.error(`Retrying Request: ${retries} left`);
        callAPI(endPoint, messageDataArray, queryParams, retries - 1);
      }
    },
  );
};

const callMessagesAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('messages', messageDataArray, queryParams);
};

const callThreadAPI = (messageDataArray, queryParams = {}) => {
  return callAPI('thread_settings', messageDataArray, queryParams);
};

export default {
  callMessagesAPI,
  callThreadAPI,
};
