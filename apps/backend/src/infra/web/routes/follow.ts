import { HttpController, HttpServerRoute } from '@infra/ports';

export const buildFollowRoute = (
  controller: HttpController
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/profile/follow',
    handler: controller,
  };
};
