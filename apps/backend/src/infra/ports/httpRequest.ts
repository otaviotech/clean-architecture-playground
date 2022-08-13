import { IncomingHttpHeaders } from 'http';

export interface HttpRequest {
  method: string;
  params: { [key: string]: string };
  headers: IncomingHttpHeaders;
  query: { [key: string]: unknown };
  body?: unknown;
}
