import { HttpServerRoute } from '@infra/ports';
import {
  buildFollowController,
  buildGetFollowStatusController,
  buildSignInController,
  buildSignUpController,
  buildUnfollowController,
} from '@main/factories/infra/controllers';

import {
  buildFollowRoute,
  buildGetFollowStatusRoute,
  buildSignInRoute,
  buildSignUpRoute,
  buildUnfollowRoute,
} from '@infra/web/routes';

export const buildWebServerRoutes: () => HttpServerRoute[] = () => {
  return [
    buildFollowRoute(buildFollowController()),
    buildGetFollowStatusRoute(buildGetFollowStatusController()),
    buildSignInRoute(buildSignInController()),
    buildSignUpRoute(buildSignUpController()),
    buildUnfollowRoute(buildUnfollowController()),
  ];
};
