import { inject, singleton } from 'tsyringe';
import { HttpController, HttpMiddleware } from '@infra/web/ports';
import { Route } from '../shared';

@singleton()
export class FollowRoute extends Route {
  constructor(
    @inject('FollowController')
    controller: HttpController,
    @inject('RequireAuthenticationMiddleware')
    requireAuthenticationMiddleware: HttpMiddleware
  ) {
    super({
      method: 'POST',
      path: '/v1/profile/follow',
      handler: controller,
      middlewares: [requireAuthenticationMiddleware],
    });
  }
}
