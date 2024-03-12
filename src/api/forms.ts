import express from 'express';
import { FilteredResponseQueryParams } from '../interfaces/FilteredResponseQueryParams';
import { filteredResponseQueryParamsSchema, filtersSchema, validate } from '../utils/validation';
import { FilterClauseType } from '../interfaces/FilterClauseType';

const router = express.Router();

router.get<{ formId: string }, any, {}, FilteredResponseQueryParams>('/:formId/filteredResponses', (req, res) => {
  console.log(111, req.params);
  console.log(222, req.query);

  if (!validate(req.query, filteredResponseQueryParamsSchema, res)) {
    return;
  }

  let filters: FilterClauseType[] = [];
  try {
    filters = JSON.parse(req.query.filters);
    filtersSchema.validateSync(filters);
  } catch (e: any) {
    return res.status(400).json({
      message: 'Filters is not a valid json',
      validationErrors: e.message,
    });
  }

  res.json(['😀', '😳', '🙄']);
});

export default router;
