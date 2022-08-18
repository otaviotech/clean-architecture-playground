import { IHttpResponse } from '@infra/web/ports';

export const buildCreatedResponse = (body: unknown): IHttpResponse => ({
  status: 201,
  body,
});
