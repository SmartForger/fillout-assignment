import axios from 'axios';
import qs from 'qs';
import { FilteredResponseQueryParams } from "../interfaces/FilteredResponseQueryParams";
import { FilteredPaginationAdapter, PaginatedResponseData } from "./FilteredPaginationAdapter";
import { FilterClauseType } from '../interfaces/FilterClauseType';

type FormResponseAdapterParams = Partial<FilteredResponseQueryParams> & { formId: string };

export class FormResponseAdapter extends FilteredPaginationAdapter<FormResponseAdapterParams, any> {
  filters: FilterClauseType[] = [];

  async getDataRequest(params: FormResponseAdapterParams): Promise<PaginatedResponseData<any>> {
    const { formId, filters, ...otherParams } = params;

    const { data } = await axios.get(`${process.env.FILLOUT_API_URL}/v1/api/forms/${formId}/submissions?${qs.stringify(otherParams)}`, {
      headers: {
        Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
      },
    });

    return {
      items: data.responses,
      totalCount: data.totalResponses,
      pageCount: data.pageCount,
    };
  }

  filterItems(response: PaginatedResponseData<any>): any[] {
    return response.items;
  }

  setFilters(filters: FilterClauseType[]) {
    this.filters = filters;
  }
}

export const formResponseAdapter = new FormResponseAdapter();
