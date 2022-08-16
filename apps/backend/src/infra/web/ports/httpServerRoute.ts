import { IHttpController, IHttpMiddleware } from '@infra/web/ports';

export interface IHttpServerRoute {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
  path: string;
  handler: IHttpController;
  middlewares?: IHttpMiddleware[];
}
