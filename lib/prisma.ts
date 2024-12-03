import { PrismaClient } from '@prisma/client';

declare global {
  // This is necessary to prevent TypeScript from complaining about redeclaration
  // of the global variable prisma in the development environment.
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') global.prisma = prisma;

export default prisma;