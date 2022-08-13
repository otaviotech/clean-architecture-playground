import { HttpController, HttpMiddleware, HttpServerRoute } from '@infra/ports';

export const buildSignUpRoute = (
  controller: HttpController,
  middlewares: HttpMiddleware[] = []
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/signup',
    handler: controller,
    middlewares,
  };
};
