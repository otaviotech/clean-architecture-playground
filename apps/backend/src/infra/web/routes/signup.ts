import { inject, singleton } from 'tsyringe';
import { IHttpController } from '@infra/web/ports';
import { Route } from '@infra/web/shared';

@singleton()
export class SignUpRoute extends Route {
  constructor(@inject('SignUpController') controller: IHttpController) {
    super({
      method: 'POST',
      path: '/v1/signup',
      handler: controller,
      middlewares: [],
    });
  }
}
