import { HttpController, HttpServerRoute } from '@infra/ports';

export const buildSignUpRoute = (
  controller: HttpController
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/signup',
    handler: controller,
  };
};
