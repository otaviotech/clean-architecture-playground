import { HttpServerRoute } from './httpServerRoute';

export interface HttpServerConfig {
  port: number;
}

export interface HttpServer {
  listen(config: HttpServerConfig): Promise<void>;
  stop(): Promise<void>;
  registerRoutes(routes: HttpServerRoute[]): void;
  printRoutes(): void;
}
