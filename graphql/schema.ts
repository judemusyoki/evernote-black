// graphql/schema.ts

import { gql } from 'apollo-server-micro'

export const typeDefs = gql`
  type User {
    id: String
    username: String
    email: String!
    createdAt: String
    updatedAt: String
  }

  type Query {
    users: [User]!
  }

  type Task {
    id: String
    title: String
    subtitle: String
    notes: String
    completed: Boolean

    createdAt: String
    updatedAt: String

    authorId: String
  }

  type Query {
    tasks: [Task]!
  }
`
