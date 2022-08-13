import { HttpResponse } from '@infra/ports';

export const buildUnauthorizedResponse = (errors: Error[]): HttpResponse => ({
  status: 401,
  body: { errors: errors.map((x) => x.message) },
});
