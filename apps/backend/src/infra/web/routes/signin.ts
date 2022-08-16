import { inject, singleton } from 'tsyringe';
import { IHttpController } from '@infra/web/ports';
import { Route } from '@infra/web/shared';

@singleton()
export class SignInRoute extends Route {
  constructor(
    @inject('SignInController')
    controller: IHttpController
  ) {
    super({
      method: 'POST',
      path: '/v1/signin',
      handler: controller,
      middlewares: [],
    });
  }
}
