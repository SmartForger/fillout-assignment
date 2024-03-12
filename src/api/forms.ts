import express from 'express';
import { FilterClauseType } from '../interfaces/FilterClauseType';

const router = express.Router();

type EmojiResponse = string[];

router.get<{ formId: string }, EmojiResponse, {}, FilterClauseType[]>('/:formId/filteredResponses', (req, res) => {
  console.log(111, req.params);
  console.log(222, req.query);
  res.json(['😀', '😳', '🙄']);
});

export default router;
