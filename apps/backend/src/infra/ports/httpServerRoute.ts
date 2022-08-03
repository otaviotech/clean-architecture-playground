import { HttpController } from '@infra/ports';

export interface HttpServerRoute {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'OPTIONS';
  path: string;
  handler: HttpController;
}
