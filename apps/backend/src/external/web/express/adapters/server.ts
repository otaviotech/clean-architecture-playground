import Table from 'cli-table';
import { Server } from 'http';
import pino from 'pino-http';
import express, { Express } from 'express';
import {
  HttpServerRoute,
  HttpServer,
  HttpServerConfig,
  ILogger,
} from '@infra/ports';
import { ExpressRouteAdapter } from '@external/web/express/adapters';
import { ExpressMiddlewareAdapter } from './middleware';
import { inject, singleton } from 'tsyringe';

@singleton()
export class ExpressServer implements HttpServer {
  private server: Server;

  constructor(
    @inject('express')
    private readonly app: Express,

    @inject('ILogger')
    private readonly logger: ILogger,

    @inject('ExpressRouteAdapter')
    private readonly routeAdapter: ExpressRouteAdapter,

    @inject('ExpressMiddlewareAdapter')
    private readonly middlewareAdapter: ExpressMiddlewareAdapter,

    @inject('APP_ROUTES')
    private readonly routes: HttpServerRoute[]
  ) {
    app.use(express.json());
    app.use(pino({ logger: this.logger.logger }));
    this.registerRoutes(routes);
  }

  registerRoutes(routes: HttpServerRoute[]): void {
    routes.forEach((route) => {
      const routeMiddlewares =
        route.middlewares?.map((middleware) =>
          this.middlewareAdapter.adapt(middleware)
        ) ?? [];

      this.app[route.method.toLowerCase()](
        route.path,
        ...routeMiddlewares,
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

  public printRoutes(): void {
    const table = new Table({
      head: ['Method', 'Path', 'Description'],
    });
    this.routes.forEach((route) => {
      table.push([route.method, route.path, '.']);
    });

    this.logger.info(table.toString());
  }
}
