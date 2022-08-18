import 'reflect-metadata';

import { appContainer } from './main/ioc/container';

import { IHttpServer } from '@infra/web/ports';

const server = appContainer.resolve<IHttpServer>('IHttpServer');

server.listen({ port: 3000 });

process.on('SIGTERM', () => {
  server.stop().then(console.log).catch(console.log);
});
