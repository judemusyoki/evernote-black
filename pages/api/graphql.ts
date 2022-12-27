import { ApolloServer } from 'apollo-server-micro'
import Cors from 'micro-cors'

import 'reflect-metadata'

import { prisma } from '@/prisma/index'

import { generateSchema } from './generate-schema'

interface EvernoteGraphQLContext {
  prisma: typeof prisma
  // session: Session & { user: Partial<User> }
}

export const config = {
  api: {
    bodyParser: false,
  },
}

const cors = Cors()

export default cors(async function handler(req, res) {
  const schema = await generateSchema()

  const myServer = new ApolloServer({
    schema,
    context: (): EvernoteGraphQLContext => ({ prisma }),
  })

  await prisma.$connect()

  await myServer.start()
  await myServer.createHandler({
    path: '/api/graphql',
  })(req, res)
})
