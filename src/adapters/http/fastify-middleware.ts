import { Middleware } from '@/ports/common'; 
import { FastifyReply, FastifyRequest } from 'fastify';

export const adaptMiddleware = (middleware: Middleware) => {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const { statusCode, data } = await middleware.handle(request);
      if (statusCode === 200) {
        Object.assign(request, data);
        return null;
      } else {
        return reply.status(statusCode).send(data);
      }
    } catch (error) {
      error instanceof Error && reply.status(400).send({ error: error.message });
    }
  };
}

