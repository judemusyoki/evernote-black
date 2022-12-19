import 'reflect-metadata'

import { GraphQLSchema } from 'graphql/type'
import { buildSchema } from 'type-graphql'

import { resolvers } from '../../prisma/generated/type-graphql'

export const generateSchema = async (
  _writeSchema = false,
) => {
  const schema = await buildSchema({
    resolvers,
    validate: false,
    dateScalarMode: 'isoDate',
  })

  return schema
}
