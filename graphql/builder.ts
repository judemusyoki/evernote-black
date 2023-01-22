import SchemaBuilder from '@pothos/core'
import PrismaPlugin from '@pothos/plugin-prisma'
import type PrismaTypes from '@pothos/plugin-prisma/generated'
import RelayPlugin from '@pothos/plugin-relay'
import { DateTimeResolver } from 'graphql-scalars'

import { prisma } from '../prisma'
import { createContext } from './context'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes
  Context: ReturnType<typeof createContext>
  Scalars: {
    DateTime: {
      Output: Date
      Input: Date
    }
  }
}>({
  plugins: [PrismaPlugin, RelayPlugin],
  relayOptions: {},
  prisma: {
    client: prisma,
  },
})

builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
})

builder.addScalarType('DateTime', DateTimeResolver, {})
