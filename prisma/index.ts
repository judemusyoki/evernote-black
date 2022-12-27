import { Prisma, PrismaClient } from '@prisma/client'

/* eslint-disable */
declare global {
  namespace NodeJS {
    interface Global {
      prisma: PrismaClient
    }
  }
}

let prisma: PrismaClient

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient()
} else {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = new PrismaClient()
  }
  // @ts-ignore
  prisma = global.prisma
}

export { prisma, Prisma, PrismaClient }
/* eslint-enable */
