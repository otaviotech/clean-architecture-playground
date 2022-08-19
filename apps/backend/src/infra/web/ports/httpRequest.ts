import { IncomingHttpHeaders } from 'http';

export type IHttpRequestMeta = {
  userId?: string;
};

export interface IHttpRequest {
  method: string;
  params: { [key: string]: string };
  headers: IncomingHttpHeaders;
  query: { [key: string]: unknown };
  body?: unknown;
  meta?: IHttpRequestMeta;
}
