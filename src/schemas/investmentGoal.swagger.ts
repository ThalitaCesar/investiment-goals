export const InvestmentGoalItem = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    months: { type: 'array', items: { type: 'string' } },
    value: { type: 'number' },
    createdAt: { type: 'string', format: 'date-time' },
    allocations: { type: 'array', items: { type: 'number' } },
  },
};

export const InvestmentGoalList = {
  type: 'array',
  items: InvestmentGoalItem,
};

export const CreateInvestmentGoalBody = {
  type: 'object',
  required: ['name', 'months', 'value'],
  properties: {
    name: { type: 'string' },
    months: {
      type: 'array',
      items: { type: 'string', enum: [
        "january","february","march","april","may","june",
        "july","august","september","october","november","december"
      ]},
    },
    value: { type: 'number' },
  },
};

export const UpdateInvestmentGoalBody = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    months: {
      type: 'array',
      items: { type: 'string', enum: [
        "january","february","march","april","may","june",
        "july","august","september","october","november","december"
      ]},
    },
    value: { type: 'number' },
  },
};

export const IdParam = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string' },
  },
};
