import Fastify from 'fastify';
import prismaPlugin from './plugins/prisma.plugin';
import schemasPlugin from './plugins/schemas.plugin';
import swaggerPlugin from './plugins/swagger.plugin';
import errorHandlerPlugin from './plugins/errorHandler.plugin';
import { investmentGoalRoutes } from './routes/investmentGoal.routes';
import { errorHandler } from './utils/errors';

const build = () => {
  const app = Fastify({ logger: true });
  app.register(prismaPlugin);
  app.register(errorHandlerPlugin);
  app.register(schemasPlugin);
  app.register(swaggerPlugin);
  app.register(investmentGoalRoutes, { prefix: '/api' });
  app.setErrorHandler(errorHandler);

  app.get('/test-prisma', async (request, reply) => {
    if (!request.server.prisma) {
      return reply.code(500).send({ message: 'Prisma is undefined!' });
    }
    const goals = await request.server.prisma.investmentGoal.findMany();
    return reply.send(goals);
  });

  return app;
};

if (require.main === module) {
  const app = build();
  const port = Number(process.env.PORT || 3333);
  app.listen({ port, host: '0.0.0.0' })
    .then(() => console.log(`Server listening on ${port}`))
    .catch(err => {
      console.error(err);
      process.exit(1);
    });
}

export default build;
