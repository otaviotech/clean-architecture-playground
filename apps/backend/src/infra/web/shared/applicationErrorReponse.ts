import { IHttpResponse } from '@infra/web/ports';

export const buildApplicationErrorResponse = (error: Error): IHttpResponse => ({
  status: 400,
  body: { error: { message: error.message } },
});
