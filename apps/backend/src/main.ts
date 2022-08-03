import { buildWebServer } from './main/factories/external/web';

const server = buildWebServer();

server.listen({ port: 3000 });

process.on('SIGTERM', () => {
  server.stop().then(console.log).catch(console.log);
});
