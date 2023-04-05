import { UseCase } from '@/ports/common';
import { FastifyReply, FastifyRequest } from 'fastify';

export const adaptRoute = (usecase: UseCase) => {
  return async (request: FastifyRequest & { user?: any }, reply: FastifyReply) => {
    try {
      const httpRequest = {
        body: request.body,
        params: request.params,
        query: request.query,
        headers: request.headers,
        user: request.user,
      };
      const { statusCode, data } = await usecase.handle(httpRequest);
      return reply.status(statusCode).send(data);
    } catch (error) {
      console.log(error)
      error instanceof Error && reply.status(400).send({ error: error.message });
    }
  };
}

