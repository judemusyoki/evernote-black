import { useResponseCache } from '@graphql-yoga/plugin-response-cache'
import { createYoga } from 'graphql-yoga'

import 'reflect-metadata'

import prisma from '@/prisma/index'

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
  plugins: [
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useResponseCache({
      // global cache
      // cache based on the authentication header
      session: (request) => request.headers.get('authentication'),
      invalidateViaMutation: false,
    }),
  ],
})
