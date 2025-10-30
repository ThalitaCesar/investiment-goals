import { FastifyInstance, FastifyError } from 'fastify';
import { ZodError } from 'zod';

function isZodError(err: unknown): err is ZodError {
  return err instanceof ZodError;
}

export default async function errorHandlerPlugin(fastify: FastifyInstance) {
  fastify.setErrorHandler((error: FastifyError | unknown, _request, reply) => {
    if (isZodError(error)) {
      const message = error.issues
        .map((issue) => `${issue.path.join('.')} - ${issue.message}`)
        .join(', ');
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message,
      });
    }

    if ((error as any)?.code === 'P2025') {
      return reply.status(404).send({
        statusCode: 404,
        error: 'Not Found',
        message: 'Registro não encontrado',
      });
    }

    fastify.log.error(error);
    return reply.status(500).send({
      statusCode: 500,
      error: 'Internal Server Error',
      message: (error as any)?.message || 'Ocorreu um erro inesperado',
    });
  });
}
