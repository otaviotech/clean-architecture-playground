import { HttpController, HttpMiddleware, HttpServerRoute } from '@infra/ports';

export const buildGetFollowStatusRoute = (
  controller: HttpController,
  middlewares: HttpMiddleware[]
): HttpServerRoute => {
  return {
    method: 'GET',
    path: '/v1/profile/status',
    handler: controller,
    middlewares,
  };
};
