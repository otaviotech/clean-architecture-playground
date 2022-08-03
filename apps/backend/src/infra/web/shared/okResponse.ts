import { HttpResponse } from '@infra/ports';

export const buildOkResponse = (body: unknown): HttpResponse => ({
  status: 200,
  body,
});
