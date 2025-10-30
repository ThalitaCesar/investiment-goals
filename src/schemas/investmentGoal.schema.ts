import { z } from 'zod';

export const monthEnum = z.enum([
  "january","february","march","april","may","june",
  "july","august","september","october","november","december"
]);

export const createInvestmentGoalBody = z.object({
  name: z.string().min(1),
  months: z.array(monthEnum).min(1),
  value: z.number().positive(),
});

export const updateInvestmentGoalBody = createInvestmentGoalBody.partial();

export const idParam = z.object({
  id: z.string().uuid(),
});
