import { HttpResponse } from '@infra/web/ports';

export const buildOkResponse = (body: unknown): HttpResponse => ({
  status: 200,
  body,
});
