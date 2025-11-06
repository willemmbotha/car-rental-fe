export interface SearchRequest {
  filters: Filter[];
  logicalOperator: string;
  orderBy: OrderBy[];
  page: number;
  pageSize: number;
}

export interface Filter {
  propertyName: string;
  operator: string;
  value: string;
}

export interface OrderBy {
  propertyName: string;
  direction: string;
}

export interface SearchResponse<T> {
  total: number;
  data: T[];
}
