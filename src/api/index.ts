import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import forms from './forms';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

router.use('/forms', forms);

export default router;
