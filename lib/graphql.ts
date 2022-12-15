import { createClient } from 'urql'

const url = 'http://localhost:3000/api/graphql'

export const client = createClient({ url })
