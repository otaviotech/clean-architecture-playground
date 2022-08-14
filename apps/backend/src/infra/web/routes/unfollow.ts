import { inject, singleton } from 'tsyringe';
import { HttpController, HttpMiddleware } from '@infra/ports';
import { Route } from '../shared';

@singleton()
export class UnfollowRoute extends Route {
  constructor(
    @inject('UnfollowController')
    controller: HttpController,
    @inject('RequireAuthenticationMiddleware')
    requireAuthenticationMiddleware: HttpMiddleware
  ) {
    super({
      method: 'GET',
      path: '/v1/profile/unfollow',
      handler: controller,
      middlewares: [requireAuthenticationMiddleware],
    });
  }
}
