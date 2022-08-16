import { IHttpServerRoute } from './httpServerRoute';

export interface IHttpServerConfig {
  port: number;
}

export interface IHttpServer {
  listen(config: IHttpServerConfig): Promise<void>;
  stop(): Promise<void>;
  registerRoutes(routes: IHttpServerRoute[]): void;
  printRoutes(): void;
}
