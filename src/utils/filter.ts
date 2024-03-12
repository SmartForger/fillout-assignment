import { FilterClauseType } from "../interfaces/FilterClauseType";

export function checkValueWithFilter(item: any, filter: FilterClauseType) {
  if (!item) {
    return false;
  }

  const value = item[filter.id];

  switch (filter.condition) {
    case 'equals':
      return value === filter.value;
    case 'does_not_equal':
      return value !== filter.value;
    case 'greater_than':
      return value > filter.value;
    case 'less_than':
      return value < filter.value;
    default:
      return false;
  }
}
