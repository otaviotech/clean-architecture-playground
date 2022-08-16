import { inject, singleton } from 'tsyringe';
import { HttpController, HttpMiddleware } from '@infra/web/ports';
import { Route } from '@infra/web/shared';

@singleton()
export class GetFollowStatusRoute extends Route {
  constructor(
    @inject('GetFollowStatusController')
    controller: HttpController,
    @inject('RequireAuthenticationMiddleware')
    requireAuthenticationMiddleware: HttpMiddleware
  ) {
    super({
      method: 'GET',
      path: '/v1/profile/status',
      handler: controller,
      middlewares: [requireAuthenticationMiddleware],
    });
  }
}
