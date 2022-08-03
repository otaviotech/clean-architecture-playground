export interface HttpRequest {
  method: string;
  params: { [key: string]: string };
  query: { [key: string]: unknown };
  body?: unknown;
}
