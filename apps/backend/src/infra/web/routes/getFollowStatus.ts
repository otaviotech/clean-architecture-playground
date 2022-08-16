import { inject, singleton } from 'tsyringe';
import { IHttpController, IHttpMiddleware } from '@infra/web/ports';
import { Route } from '@infra/web/shared';

@singleton()
export class GetFollowStatusRoute extends Route {
  constructor(
    @inject('GetFollowStatusController')
    controller: IHttpController,
    @inject('RequireAuthenticationMiddleware')
    requireAuthenticationMiddleware: IHttpMiddleware
  ) {
    super({
      method: 'GET',
      path: '/v1/profile/status',
      handler: controller,
      middlewares: [requireAuthenticationMiddleware],
    });
  }
}
