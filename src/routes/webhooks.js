import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  if (req.query['hub.verify_token'] === process.env.WEBHOOK_TOKEN) {
    res.send(req.query['hub.challange']);
  } else {
    res.send('Error, wront token');
  }
});

export default router;
