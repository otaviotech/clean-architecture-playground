import { inject, singleton } from 'tsyringe';
import { IHttpController, IHttpMiddleware } from '@infra/web/ports';
import { Route } from '@infra/web/shared';

@singleton()
export class UnfollowRoute extends Route {
  constructor(
    @inject('UnfollowController')
    controller: IHttpController,
    @inject('RequireAuthenticationMiddleware')
    requireAuthenticationMiddleware: IHttpMiddleware
  ) {
    super({
      method: 'GET',
      path: '/v1/profile/unfollow',
      handler: controller,
      middlewares: [requireAuthenticationMiddleware],
    });
  }
}
