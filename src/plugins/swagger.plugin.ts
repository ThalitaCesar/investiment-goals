import { FastifyInstance } from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { monthEnum } from '../schemas/investmentGoal.schema';

export default async function swaggerPlugin(fastify: FastifyInstance) {
  const createInvestmentGoalSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      months: { type: 'array', items: { type: 'string', enum: monthEnum.options }, minItems: 1 },
      value: { type: 'number', minimum: 0.01 }
    },
    required: ['name', 'months', 'value']
  };

  const updateInvestmentGoalSchema = {
    type: 'object',
    properties: {
      name: { type: 'string', minLength: 1 },
      months: { type: 'array', items: { type: 'string', enum: monthEnum.options } },
      value: { type: 'number', minimum: 0.01 }
    }
  };

  const idParamSchema = {
    type: 'object',
    properties: { id: { type: 'string', format: 'uuid' } },
    required: ['id']
  };

  const investmentGoalItemSchema = {
    type: 'object',
    properties: {
      id: { type: 'string', format: 'uuid' },
      name: { type: 'string' },
      months: { type: 'array', items: { type: 'string', enum: monthEnum.options } },
      value: { type: 'number' },
      createdAt: { type: 'string', format: 'date-time' },
      allocations: { type: 'array', items: { type: 'number' } }
    },
    required: ['id', 'name', 'months', 'value', 'createdAt', 'allocations']
  };

  await fastify.register(fastifySwagger as any, {
    openapi: {
      info: { title: 'Investment Goals API', version: '1.0.0' },
      paths: {
        '/api/investment-goals': {
          post: {
            summary: 'Create Investment Goal',
            requestBody: { content: { 'application/json': { schema: createInvestmentGoalSchema } } },
            responses: { '201': { description: 'Created', content: { 'application/json': { schema: investmentGoalItemSchema } } } }
          },
          get: {
            summary: 'List Investment Goals',
            responses: { '200': { description: 'List', content: { 'application/json': { schema: { type: 'array', items: investmentGoalItemSchema } } } } }
          }
        },
        '/api/investment-goals/{id}': {
          get: {
            summary: 'Get Investment Goal by ID',
            parameters: [{ name: 'id', in: 'path', required: true, schema: idParamSchema.properties.id }],
            responses: { '200': { description: 'OK', content: { 'application/json': { schema: investmentGoalItemSchema } } } }
          },
          put: {
            summary: 'Update Investment Goal',
            parameters: [{ name: 'id', in: 'path', required: true, schema: idParamSchema.properties.id }],
            requestBody: { content: { 'application/json': { schema: updateInvestmentGoalSchema } } },
            responses: { '200': { description: 'Updated', content: { 'application/json': { schema: investmentGoalItemSchema } } } }
          },
          delete: {
            summary: 'Delete Investment Goal',
            parameters: [{ name: 'id', in: 'path', required: true, schema: idParamSchema.properties.id }],
            responses: { '204': { description: 'Deleted' } }
          }
        }
      }
    },
    exposeRoute: true,
    routePrefix: '/docs/json'
  });

  await fastify.register(fastifySwaggerUi as any, {
    routePrefix: '/docs',
    uiConfig: { docExpansion: 'none' }
  });
}
