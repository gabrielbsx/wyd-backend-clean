import 'reflect-metadata';
import { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import formbody from '@fastify/formbody'
import formMultipart from '@fastify/multipart';
import middie from '@fastify/middie';
import dotenv from 'dotenv';
import { MongooseConnection, RedisConnection } from '@/adapters/db';
import qs from 'qs';
import { routerFastify } from './routes';

export async function bootstrap(app: FastifyInstance) {
  dotenv.config();
  const mongooseConnection = new MongooseConnection();
  const redisConnection = new RedisConnection();
  await mongooseConnection.connect();
  await redisConnection.connect();
  app.register(middie);
  app.register(formbody, { parser: qs.parse });
  app.register(formMultipart, { addToBody: true });
  app.register(cors);
  app.register(routerFastify);
}

