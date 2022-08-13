import { HttpController, HttpMiddleware, HttpServerRoute } from '@infra/ports';

export const buildSignInRoute = (
  controller: HttpController,
  middlewares?: HttpMiddleware[]
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/signin',
    handler: controller,
    middlewares,
  };
};
