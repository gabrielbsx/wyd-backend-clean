import fastify from 'fastify';
import { bootstrap } from './bootstrap';

const run = async () => {
  const server = fastify();
  await bootstrap(server);
  server.listen({ port: 3001 }, (err, address) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    console.log(`Server listening at ${address}`);
  });
}

run();

