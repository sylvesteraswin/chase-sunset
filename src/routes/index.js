import express from 'express';

const router = express.Router();

// Get homepage
router.get('/', (_, res) => {
  res.render('./index', {
    demo: process.env.DEMO,
    title: 'Chase Sunset',
  });
});

export default router;
