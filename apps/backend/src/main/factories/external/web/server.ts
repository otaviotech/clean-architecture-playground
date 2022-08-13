import express from 'express';
import 'express-async-errors';
import { HttpServer } from '@infra/ports';
import { buildWebServerRoutes } from './routes';
import { ExpressServer } from '@external/web/express/adapters';

export const buildWebServer = (): HttpServer => {
  const server = new ExpressServer(express());

  server.registerRoutes(buildWebServerRoutes());

  return server;
};
