import { IHttpResponse } from '@infra/web/ports';

export const buildOkResponse = (body: unknown): IHttpResponse => ({
  status: 200,
  body,
});
