import { createClient } from 'urql'

const url = `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`

export const client = createClient({ url })
