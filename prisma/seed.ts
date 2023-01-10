// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
import { v4 } from 'uuid'

const prisma = new PrismaClient()

const userId1 = v4()

async function main() {
  // Delete all `User` and `Task` records
  await prisma.task.deleteMany({})
  await prisma.user.deleteMany({})

  // (Re-)Create dummy `User` and `Task` records
  await prisma.user.create({
    data: {
      id: userId1,
      name: 'Jude Musyoki',
      email: 'judemusyoki@gmail.com',
      emailVerified: new Date(),
      createdAt: new Date(),
    },
  })

  await prisma.task.create({
    data: {
      id: v4(),
      title: 'Seeded task 1',
      subtitle: 'Seeded sub something',
      notes: 'Something of notes',
      createdAt: new Date(),
      authorId: userId1,
    },
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    console.log(`Data seeded...	🌱`)
    await prisma.$disconnect()
  })
