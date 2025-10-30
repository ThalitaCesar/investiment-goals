import { InvestmentGoalRepository } from '../repositories/investmentGoal.repository';

export class InvestmentGoalService {
  constructor(private repo: InvestmentGoalRepository) {}

  computeAllocation(total: number, monthsCount: number) {
    const base = Math.floor((total / monthsCount) * 100) / 100;
    const allocations = Array(monthsCount).fill(base);
    const remainder = Math.round((total - base * monthsCount) * 100) / 100;
    if (remainder > 0) {
      allocations[allocations.length - 1] =
        Math.round((allocations[allocations.length - 1] + remainder) * 100) / 100;
    }
    return allocations;
  }

  async create(payload: { name: string; months: string[]; value: number }) {
    const allocation = this.computeAllocation(payload.value, payload.months.length);
    const created = await this.repo.create(payload);
    return { ...created, allocations: allocation };
  }

  async list(filters?: { name?: string; month?: string }) {
    const goals = await this.repo.findAll(filters);
    return goals.map(goal => ({
      ...goal,
      allocations: this.computeAllocation(goal.value, goal.months.length)
    }));
  }

  async getById(id: string) {
    const goal = await this.repo.findById(id);
    if (!goal) return null;
    return { ...goal, allocations: this.computeAllocation(goal.value, goal.months.length) };
  }

  async update(id: string, payload: Partial<{ name: string; months: string[]; value: number }>) {
    const current = await this.repo.findById(id);
    if (!current) throw new Error('Investment goal not found');

    const months = payload.months ?? current.months;
    const value = payload.value ?? current.value;
    const allocation = this.computeAllocation(value, months.length);

    const updated = await this.repo.update(id, payload);
    return { ...updated, allocations: allocation };
  }

  async remove(id: string) {
    await this.repo.delete(id);
  }
}
