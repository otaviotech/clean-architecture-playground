import { HttpController, HttpMiddleware, HttpServerRoute } from '@infra/ports';

export const buildFollowRoute = (
  controller: HttpController,
  middlewares?: HttpMiddleware[]
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/profile/follow',
    handler: controller,
    middlewares,
  };
};
