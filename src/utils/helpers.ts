/**
 * Divide um valor total igualmente entre uma quantidade de meses,
 * garantindo que a soma dos valores seja exatamente igual ao total.
 * 
 * @param total - Valor total a ser dividido
 * @param monthsCount - Quantidade de meses
 * @returns Array com o valor por mês
 */
export function splitValueEqually(total: number, monthsCount: number): number[] {
  if (monthsCount <= 0) throw new Error('monthsCount deve ser maior que zero');

  const factor = 100;
  const totalCents = Math.round(total * factor);
  const base = Math.floor(totalCents / monthsCount);
  const remainder = totalCents % monthsCount;

  const allocations = Array.from({ length: monthsCount }, (_, i) =>
    (base + (i < remainder ? 1 : 0)) / factor
  );

  return allocations;
}
