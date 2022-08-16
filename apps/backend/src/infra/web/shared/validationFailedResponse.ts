import { IHttpResponse } from '@infra/web/ports';

export const buildValidationFailedResponse = (
  errors: Error[]
): IHttpResponse => ({
  status: 400,
  body: { errors: errors.map((x) => x.message) },
});
