import { HttpController, HttpMiddleware, HttpServerRoute } from '@infra/ports';

export const buildUnfollowRoute = (
  controller: HttpController,
  middlewares?: HttpMiddleware[]
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/profile/unfollow',
    handler: controller,
    middlewares,
  };
};
