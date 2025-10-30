import { FastifyInstance } from 'fastify';
import { investmentGoalController } from '../controllers/investmentGoal.controller';
import {
  InvestmentGoalItem,
  InvestmentGoalList,
  CreateInvestmentGoalBody,
  UpdateInvestmentGoalBody,
  IdParam,
} from '../schemas/investmentGoal.swagger';

export async function investmentGoalRoutes(fastify: FastifyInstance) {
  const ctrl = investmentGoalController();

  fastify.post('/investment-goals', {
    schema: {
      body: CreateInvestmentGoalBody,
      response: { 201: InvestmentGoalItem },
    },
  }, ctrl.create);

  fastify.get('/investment-goals', {
    schema: {
      response: { 200: InvestmentGoalList },
    },
  }, ctrl.list);

  fastify.get('/investment-goals/:id', {
    schema: {
      params: IdParam,
      response: { 200: InvestmentGoalItem },
    },
  }, ctrl.getById);

  fastify.put('/investment-goals/:id', {
    schema: {
      params: IdParam,
      body: UpdateInvestmentGoalBody,
      response: { 200: InvestmentGoalItem },
    },
  }, ctrl.update);

  fastify.delete('/investment-goals/:id', {
    schema: {
      params: IdParam,
      response: { 204: { type: 'null' } },
    },
  }, ctrl.remove);
}
