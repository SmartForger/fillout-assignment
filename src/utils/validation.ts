import * as yup from "yup";
import { Response } from "express";

export const filtersSchema = yup.array().of(
  yup
    .object({
      id: yup.string().required(),
      condition: yup
        .string()
        .oneOf(["equals", "does_not_equal", "greater_than", "less_than"])
        .required(),
      value: yup.string().required(),
    })
    .strict()
);

export const filteredResponseQueryParamsSchema = yup.object({
  limit: yup.number().optional().integer().min(0),
  afterDate: yup.date().optional(),
  beforeDate: yup.date().optional(),
  offset: yup.number().optional().integer().min(0),
  status: yup.string().oneOf(["in_progress", "finished"]).optional(),
  includeEditLink: yup.boolean().optional(),
  sort: yup.string().oneOf(["asc", "desc"]).optional(),
  filters: yup.string().required(),
});

export const validate = (data: any, schema: yup.Schema, res: Response) => {
  try {
    schema.validateSync(data);
    return true;
  } catch (e: any) {
    res.status(400).json({
      message: e.message,
      stack: e.stack,
    });
    return false;
  }
};
