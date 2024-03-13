import { pMap } from "../utils/p-map";

export type PaginatedResponseData<T> = {
  items: T[];
  totalCount: number;
  pageCount: number;
};

export abstract class FilterAdapter<TParams, TData> {
  public readonly MAX_PAGE_SIZE = 150;
  private readonly MAX_PROMISE_CONCURRENCY = 10;

  abstract getDataRequest(
    params: TParams
  ): Promise<PaginatedResponseData<TData>>;

  abstract filterItems(response: PaginatedResponseData<TData>): TData[];

  async getFilteredItems(params: TParams) {
    const paramsWithoutPagination = this.excludePaginationParams(params);

    try {
      const response = await this.getDataRequest(paramsWithoutPagination);

      const totalPages = Math.ceil(response.totalCount / this.MAX_PAGE_SIZE);

      const indices = new Array(totalPages - 1).fill(0).map((_, i) => i);

      const mapper = (i: number) => {
        const paginatedParams = {
          ...paramsWithoutPagination,
          limit: this.MAX_PAGE_SIZE,
          offset: this.MAX_PAGE_SIZE * (i + 1),
        };

        return this.getDataRequest(paginatedParams);
      };

      const result = await pMap(indices, mapper, this.MAX_PROMISE_CONCURRENCY);
      result.unshift(response);

      return result.map((response) => this.filterItems(response)).flat();
    } catch (e) {
      return [];
    }
  }

  private excludePaginationParams(params: any) {
    if (typeof params !== "object") {
      return params;
    }

    const { limit, offset, ...restParams } = params;

    return restParams;
  }
}
