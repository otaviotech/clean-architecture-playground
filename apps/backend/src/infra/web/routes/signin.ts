import { inject, singleton } from 'tsyringe';
import { HttpController } from '@infra/ports';
import { Route } from '../shared';

@singleton()
export class SignInRoute extends Route {
  constructor(
    @inject('SignInController')
    controller: HttpController
  ) {
    super({
      method: 'POST',
      path: '/v1/signin',
      handler: controller,
      middlewares: [],
    });
  }
}
