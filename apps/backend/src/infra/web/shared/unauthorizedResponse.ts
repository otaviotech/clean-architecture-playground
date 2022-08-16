import { IHttpResponse } from '@infra/web/ports';

export const buildUnauthorizedResponse = (errors: Error[]): IHttpResponse => ({
  status: 401,
  body: { errors: errors.map((x) => x.message) },
});
