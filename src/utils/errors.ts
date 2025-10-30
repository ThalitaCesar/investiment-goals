import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { ZodError } from 'zod';

export function errorHandler(error: FastifyError | ZodError, _req: FastifyRequest, reply: FastifyReply) {
  if (error instanceof ZodError) {
    const formatted = error.issues.map((issue) => ({
      path: issue.path.join('.'),
      message: issue.message,
    }));
    return reply.status(400).send({
      statusCode: 400,
      error: 'Validation Error',
      details: formatted,
    });
  }

  console.error(error);
  return reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: error.message || 'Unexpected error occurred',
  });
}