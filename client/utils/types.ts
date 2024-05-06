export interface QueryResult {
  result: Creator[];
}

export interface APIResponse<T> {
  data: T;
  msg?: string;
  status: number;
}

export interface QueryResult {
  result: Creator[];
}

export interface APIErrorResponse {
  error: string;
}

export interface QueryError {
  response?: {
    data: APIErrorResponse;
    status: number;
    statusText: string;
  };
}

export interface Creator {
  id: string;
  name: string;
  generated_code: string;
  userId: string;
}

export interface Snippets {
  id: string;
  name: string;
  generated_code: string;
  email: string;
}
