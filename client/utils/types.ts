export interface QueryResult {
  result: Creator[];
}

export interface APIResponse<T> {
  data: T;
  msg: string;
  status: number;
}

export interface QueryResult {
  result: Creator[];
}

export interface Creator {
  id: string;
  name: string;
  generated_code: string;
  userId: string;
}