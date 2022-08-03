import { HttpResponse } from '@infra/ports';

export const buildApplicationErrorResponse = (error: Error): HttpResponse => ({
  status: 400,
  body: { error: { message: error.message } },
});
