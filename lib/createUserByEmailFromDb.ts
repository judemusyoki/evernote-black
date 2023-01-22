import { User } from '@prisma/client'

import { prisma } from '../prisma'

type CreateActerFromDBParams = {
  email: string
  auth0ProviderId: string
}

export const createUserByEmailFromDb = async ({
  email,
  auth0ProviderId,
}: CreateActerFromDBParams): Promise<User> => {
  return prisma.user.upsert({
    create: { email, auth0ProviderId },
    update: { auth0ProviderId },
    where: { email },
  })
}
