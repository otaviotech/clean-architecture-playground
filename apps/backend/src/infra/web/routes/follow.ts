import { inject, singleton } from 'tsyringe';
import { IHttpController, IHttpMiddleware } from '@infra/web/ports';
import { Route } from '../shared';

@singleton()
export class FollowRoute extends Route {
  constructor(
    @inject('FollowController')
    controller: IHttpController,
    @inject('RequireAuthenticationMiddleware')
    requireAuthenticationMiddleware: IHttpMiddleware,
    @inject('InjectAuthMetaMiddleware')
    injectAuthMetaMiddleware: IHttpMiddleware
  ) {
    super({
      method: 'POST',
      path: '/v1/profile/follow',
      handler: controller,
      middlewares: [requireAuthenticationMiddleware, injectAuthMetaMiddleware],
    });
  }
}
