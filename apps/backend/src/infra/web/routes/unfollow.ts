import { HttpController, HttpServerRoute } from '@infra/ports';

export const buildUnfollowRoute = (
  controller: HttpController
): HttpServerRoute => {
  return {
    method: 'POST',
    path: '/v1/profile/unfollow',
    handler: controller,
  };
};
