import { HttpController, HttpServerRoute } from '@infra/ports';

export const buildSignInRoute = (
  controller: HttpController
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/signin',
    handler: controller,
  };
};
