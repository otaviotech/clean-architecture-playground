import { HttpResponse } from '@infra/ports';

export const buildUnauthorizedResponse = (errors: Error[]): HttpResponse => ({
  status: 400,
  body: { errors: errors.map((x) => x.message) },
});
