import { HttpController, HttpMiddleware, HttpServerRoute } from '@infra/ports';

export abstract class Route implements HttpServerRoute {
  method: 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
  path: string;
  handler: HttpController;
  middlewares?: HttpMiddleware[];

  constructor(config: HttpServerRoute) {
    this.method = config.method;
    this.path = config.path;
    this.handler = config.handler;
    this.middlewares = config.middlewares;
  }
}
