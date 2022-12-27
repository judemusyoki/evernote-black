import { createClient } from 'urql'

const url = `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`

export const client = createClient({ url })
