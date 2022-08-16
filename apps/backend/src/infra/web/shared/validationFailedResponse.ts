import { HttpResponse } from '@infra/web/ports';

export const buildValidationFailedResponse = (
  errors: Error[]
): HttpResponse => ({
  status: 400,
  body: { errors: errors.map((x) => x.message) },
});
