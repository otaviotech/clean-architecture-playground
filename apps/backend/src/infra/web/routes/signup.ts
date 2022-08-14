import { inject, singleton } from 'tsyringe';
import { HttpController } from '@infra/ports';
import { Route } from '../shared';

@singleton()
export class SignUpRoute extends Route {
  constructor(@inject('SignUpController') controller: HttpController) {
    super({
      method: 'POST',
      path: '/v1/signup',
      handler: controller,
      middlewares: [],
    });
  }
}
