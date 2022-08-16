import { HttpResponse } from '@infra/web/ports';

export const buildApplicationErrorResponse = (error: Error): HttpResponse => ({
  status: 400,
  body: { error: { message: error.message } },
});
