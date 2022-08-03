import { HttpController, HttpServerRoute } from '@infra/ports';

export const buildGetFollowStatusRoute = (
  controller: HttpController
): HttpServerRoute => {
  return {
    method: 'GET',
    path: '/v1/profile/status',
    handler: controller,
  };
};
