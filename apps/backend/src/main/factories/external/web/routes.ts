import { HttpServerRoute } from '@infra/ports';
import {
  buildFollowController,
  buildGetFollowStatusController,
  buildSignUpController,
  buildUnfollowController,
} from '@main/factories/infra/controllers';

import {
  buildFollowRoute,
  buildGetFollowStatusRoute,
  buildSignUpRoute,
  buildUnfollowRoute,
} from '@infra/web/routes';

export const buildWebServerRoutes: () => HttpServerRoute[] = () => {
  return [
    buildFollowRoute(buildFollowController()),
    buildGetFollowStatusRoute(buildGetFollowStatusController()),
    buildSignUpRoute(buildSignUpController()),
    buildUnfollowRoute(buildUnfollowController()),
  ];
};
