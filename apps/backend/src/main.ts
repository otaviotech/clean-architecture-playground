import 'reflect-metadata';

import { appContainer } from './main/ioc/container';

import { HttpServer } from '@infra/web/ports';

const server = appContainer.resolve<HttpServer>('ExpressServer');

server.listen({ port: 3000 });

process.on('SIGTERM', () => {
  server.stop().then(console.log).catch(console.log);
});
