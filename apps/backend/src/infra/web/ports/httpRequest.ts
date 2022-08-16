import { IncomingHttpHeaders } from 'http';

export interface IHttpRequest {
  method: string;
  params: { [key: string]: string };
  headers: IncomingHttpHeaders;
  query: { [key: string]: unknown };
  body?: unknown;
}
