// // import { PrismaClient } from '@prisma/client';

// // let db: PrismaClient;

// // declare global {
// //   var __db: PrismaClient | undefined;
// // }

// // if (!global.__db) {
// //   global.__db = new PrismaClient();
// // }

// // db = global.__db;
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
