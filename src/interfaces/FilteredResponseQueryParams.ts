export interface FilteredResponseQueryParams {
  limit?: number;
  afterDate?: Date;
  beforeDate?: Date;
  offset?: number;
  status?: 'in_progress' | 'finished';
  includeEditLink?: boolean;
  sort?: 'asc' | 'desc';
  filters: string;
}
