import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.investmentGoal.createMany({
    data: [
      {
        name: 'Viagem Japão',
        months: ['january', 'february', 'march'],
        value: 9000
      },
      {
        name: 'Curso Frontend Avançado',
        months: ['april', 'may', 'june'],
        value: 3000
      },
      {
        name: 'Reserva de Emergência',
        months: ['july', 'august', 'september'],
        value: 5000
      }
    ]
  });

  console.log('Banco populado com sucesso!');
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
