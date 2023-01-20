// graphql/schema.ts
import { builder } from './builder'
import './types/Task'
import './types/User'

export const schema = builder.toSchema()
