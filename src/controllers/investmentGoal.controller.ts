import { FastifyReply, FastifyRequest } from 'fastify';
import { createInvestmentGoalBody, updateInvestmentGoalBody, idParam } from '../schemas/investmentGoal.schema';
import { InvestmentGoalRepository } from '../repositories/investmentGoal.repository';
import { InvestmentGoalService } from '../services/investmentGoal.service';

export const investmentGoalController = () => {
  return {
    async create(request: FastifyRequest, reply: FastifyReply) {
      const parsed = createInvestmentGoalBody.parse(request.body);
      const repo = new InvestmentGoalRepository(request.server.prisma);
      const service = new InvestmentGoalService(repo);
      const result = await service.create(parsed);
      return reply.code(201).send(result);
    },

    async list(request: FastifyRequest, reply: FastifyReply) {
      const query = request.query as any;
      const filters = { name: query.name, month: query.month };
      const repo = new InvestmentGoalRepository(request.server.prisma);
      const service = new InvestmentGoalService(repo);
      const result = await service.list(filters);
      return reply.send(result);
    },

    async getById(request: FastifyRequest, reply: FastifyReply) {
      const { id } = idParam.parse(request.params);
      const repo = new InvestmentGoalRepository(request.server.prisma);
      const service = new InvestmentGoalService(repo);
      const goal = await service.getById(id);
      if (!goal) return reply.code(404).send({ message: 'Investment goal not found' });
      return reply.send(goal);
    },

    async update(request: FastifyRequest, reply: FastifyReply) {
      const { id } = idParam.parse(request.params);
      const body = updateInvestmentGoalBody.parse(request.body);
      const repo = new InvestmentGoalRepository(request.server.prisma);
      const service = new InvestmentGoalService(repo);
      try {
        const updated = await service.update(id, body);
        return reply.send(updated);
      } catch (err: any) {
        return reply.code(404).send({ message: err.message || 'Not found' });
      }
    },

    async remove(request: FastifyRequest, reply: FastifyReply) {
      const { id } = idParam.parse(request.params);
      const repo = new InvestmentGoalRepository(request.server.prisma);
      const service = new InvestmentGoalService(repo);
      try {
        await service.remove(id);
        return reply.code(204).send();
      } catch (err: any) {
        return reply.code(404).send({ message: err.message || 'Not found' });
      }
    }
  };
};
