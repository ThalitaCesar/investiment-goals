import { PrismaClient, Prisma } from '@prisma/client';

export class InvestmentGoalRepository {
  constructor(private prisma: PrismaClient) {}

  async create(data: { name: string; months: string[]; value: number }) {
    return this.prisma.investmentGoal.create({ data });
  }

async findAll(filters?: { name?: string; month?: string }) {
    const where = {
      ...(filters?.name && { name: { contains: filters.name, mode: 'insensitive' } }),
      ...(filters?.month && { months: { has: filters.month.toLowerCase() } })
    };

    return this.prisma.investmentGoal.findMany({ where });
  }
  async findById(id: string) {
    return this.prisma.investmentGoal.findUnique({ where: { id } });
  }

  async update(id: string, data: Partial<{ name: string; months: string[]; value: number }>) {
    return this.prisma.investmentGoal.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.investmentGoal.delete({ where: { id } });
  }
}
