import express from 'express';
import request from 'request';
import bodyParser from 'body-parser';

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: false,
  }),
);
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

//Server index page
app.get('/', (req, res) => {
  res.send('Deployed');
});

// Facebook webhook
// User for verification
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === 'this_is_my_token') {
    console.log('Verified webhook');
    res.status(200).send(req.query('hub.challange'));
  } else {
    console.error('Verification failed. The tokens do not match');
    res.sendStatus(403);
  }
});
