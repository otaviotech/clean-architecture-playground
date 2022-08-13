import { HttpServerRoute } from '@infra/ports';

import {
  buildFollowRoute,
  buildGetFollowStatusRoute,
  buildSignInRoute,
  buildSignUpRoute,
  buildUnfollowRoute,
} from '@infra/web/routes';

import {
  buildFollowController,
  buildGetFollowStatusController,
  buildSignInController,
  buildSignUpController,
  buildUnfollowController,
} from '@main/factories/infra/controllers';

import { buildRequireAuthenticationMiddleware } from '@main/factories/infra/middlewares/requireAuth';

export const buildWebServerRoutes: () => HttpServerRoute[] = () => {
  const requireAuthenticationMiddleware =
    buildRequireAuthenticationMiddleware();

  return [
    buildFollowRoute(buildFollowController(), [
      requireAuthenticationMiddleware,
    ]),
    buildGetFollowStatusRoute(buildGetFollowStatusController(), [
      requireAuthenticationMiddleware,
    ]),
    buildSignInRoute(buildSignInController()),
    buildSignUpRoute(buildSignUpController()),
    buildUnfollowRoute(buildUnfollowController(), [
      requireAuthenticationMiddleware,
    ]),
  ];
};
