import express from "express";
import { FilteredResponseQueryParams } from "../interfaces/FilteredResponseQueryParams";
import {
  filteredResponseQueryParamsSchema,
  filtersSchema,
  validate,
} from "../utils/validation";
import { FilterClauseType } from "../interfaces/FilterClauseType";
import { formResponseAdapter } from "../adapters/FormResponseAdapter";

const router = express.Router();

router.get<{ formId: string }, any, {}, FilteredResponseQueryParams>(
  "/:formId/filteredResponses",
  async (req, res) => {
    if (!validate(req.query, filteredResponseQueryParamsSchema, res)) {
      return;
    }

    const { filters: filtersStr, ...otherQueryParams } = req.query;

    let filters: FilterClauseType[] = [];
    try {
      filters = JSON.parse(filtersStr);
      filtersSchema.validateSync(filters);
    } catch (e: any) {
      return res.status(400).json({
        message: "Filters is not a valid json",
        validationErrors: e.message,
      });
    }

    formResponseAdapter.setFilters(filters);

    const filteredItems = await formResponseAdapter.getFilteredItems({
      ...otherQueryParams,
      formId: req.params.formId,
    });

    const totalCount = filteredItems.length;
    const pageSize = +(req.query.limit || formResponseAdapter.MAX_PAGE_SIZE);
    const pageCount = Math.ceil(totalCount / pageSize);
    const offset = +(req.query.offset || 0);

    res.send({
      responses: filteredItems.slice(offset, offset + pageSize),
      totalResponses: totalCount,
      pageCount,
    });
  }
);

export default router;
