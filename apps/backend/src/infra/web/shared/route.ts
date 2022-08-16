import {
  IHttpController,
  IHttpMiddleware,
  IHttpServerRoute,
} from '@infra/web/ports';

export abstract class Route implements IHttpServerRoute {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
  path: string;
  handler: IHttpController;
  middlewares?: IHttpMiddleware[];

  constructor(config: IHttpServerRoute) {
    this.method = config.method;
    this.path = config.path;
    this.handler = config.handler;
    this.middlewares = config.middlewares;
  }
}
