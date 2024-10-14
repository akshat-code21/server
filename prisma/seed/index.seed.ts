import { PrismaClient } from '@prisma/client';
import { seedRoles } from './roles.seed';

const prisma = new PrismaClient();

async function main() {
    await seedRoles(prisma);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
