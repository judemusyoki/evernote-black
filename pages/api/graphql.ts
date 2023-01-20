// /pages/api/graphql.ts
import { createYoga } from 'graphql-yoga'

import type { NextApiRequest, NextApiResponse } from 'next'

import { schema } from '../../graphql/schema'

export default createYoga<{
  req: NextApiRequest
  res: NextApiResponse
}>({
  schema,
  graphqlEndpoint: '/api/graphql',
})

export const config = {
  api: {
    bodyParser: false,
  },
}

// import { createYoga } from 'graphql-yoga'

// import 'reflect-metadata'

// import { prisma } from '@/prisma/index'

// import { generateSchema } from './generate-schema'

// interface EvernoteGraphQLContext {
//   prisma: typeof prisma
//   // TODO: Add user session
//   // session: Session & { user: Partial<User> }
// }

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// const schema = await generateSchema()

// export default createYoga({
//   schema,
//   graphqlEndpoint: '/api/graphql',
//   context: (): EvernoteGraphQLContext => ({ prisma }),
// })
