import { FastifyInstance } from 'fastify';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { createInvestmentGoalBody, updateInvestmentGoalBody, idParam, monthEnum } from '../schemas/investmentGoal.schema';

export default async function schemasPlugin(fastify: FastifyInstance) {
  fastify.addSchema({ $id: 'CreateInvestmentGoalBody', ...zodToJsonSchema(createInvestmentGoalBody) });
  fastify.addSchema({ $id: 'UpdateInvestmentGoalBody', ...zodToJsonSchema(updateInvestmentGoalBody) });
  fastify.addSchema({ $id: 'IdParam', ...zodToJsonSchema(idParam) });

  fastify.addSchema({
    $id: 'InvestmentGoalItem',
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      months: { type: 'array', items: { type: 'string', enum: monthEnum.options } },
      value: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      allocations: { type: 'array', items: { type: 'number' } },
    },
    required: ['id', 'name', 'months', 'value', 'createdAt', 'allocations'],
  });

  fastify.addSchema({
    $id: 'InvestmentGoalList',
    type: 'array',
    items: { $ref: 'InvestmentGoalItem#' },
  });
}
