import { Server } from 'http';
import pino from 'pino-http';
import express, { Express } from 'express';
import { HttpServerRoute, HttpServer, HttpServerConfig } from '@infra/ports';
import { ExpressRouteAdapter } from '@external/web/express/adapters';
import { PinoLogger } from '@external/logger/pino/adapters/logger';

export class ExpressServer implements HttpServer {
  private logger = new PinoLogger();
  private routeAdapter = new ExpressRouteAdapter(this.logger);
  private server: Server;

  constructor(private app: Express) {
    app.use(express.json());
    app.use(pino({ logger: this.logger.logger }));
  }

  registerRoutes(routes: HttpServerRoute[]): void {
    routes.forEach((route) => {
      this.app[route.method.toLowerCase()](
        route.path,
        this.routeAdapter.adapt(route.handler)
      );
    });
  }

  async listen(config: HttpServerConfig): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server = this.app
        .listen(config.port)
        .on('listening', resolve)
        .on('error', reject);
    });
  }

  async stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.server.close((err) => {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
}
