import { createYoga } from 'graphql-yoga'

import 'reflect-metadata'

import { prisma } from '@/prisma/index'

import { generateSchema } from './generate-schema'

interface EvernoteGraphQLContext {
  prisma: typeof prisma
  // TODO: Add user session
  // session: Session & { user: Partial<User> }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const schema = await generateSchema()

export default createYoga({
  schema,
  graphqlEndpoint: '/api/graphql',
  context: (): EvernoteGraphQLContext => ({ prisma }),
})
