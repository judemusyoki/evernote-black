import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
import gql from 'graphql-tag'
import * as Urql from 'urql'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K]
}
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>
}
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>
}
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Query = {
  __typename?: 'Query'
  tasks: Array<Maybe<Task>>
  users: Array<Maybe<User>>
}

export type Task = {
  __typename?: 'Task'
  authorId?: Maybe<Scalars['String']>
  completed?: Maybe<Scalars['Boolean']>
  createdAt?: Maybe<Scalars['String']>
  id?: Maybe<Scalars['String']>
  notes?: Maybe<Scalars['String']>
  subtitle?: Maybe<Scalars['String']>
  title?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
}

export type User = {
  __typename?: 'User'
  createdAt?: Maybe<Scalars['String']>
  email: Scalars['String']
  id?: Maybe<Scalars['String']>
  updatedAt?: Maybe<Scalars['String']>
  username?: Maybe<Scalars['String']>
}

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never }>

export type GetAllTasksQuery = {
  __typename?: 'Query'
  tasks: Array<{
    __typename?: 'Task'
    id?: string | null
    title?: string | null
    subtitle?: string | null
    notes?: string | null
    completed?: boolean | null
    createdAt?: string | null
    updatedAt?: string | null
    authorId?: string | null
  } | null>
}

export const GetAllTasksDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllTasks' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'tasks' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'subtitle' } },
                { kind: 'Field', name: { kind: 'Name', value: 'notes' } },
                { kind: 'Field', name: { kind: 'Name', value: 'completed' } },
                { kind: 'Field', name: { kind: 'Name', value: 'createdAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'updatedAt' } },
                { kind: 'Field', name: { kind: 'Name', value: 'authorId' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetAllTasksQuery, GetAllTasksQueryVariables>
import { IntrospectionQuery } from 'graphql'
export default {
  __schema: {
    queryType: {
      name: 'Query',
    },
    mutationType: null,
    subscriptionType: null,
    types: [
      {
        kind: 'OBJECT',
        name: 'Query',
        fields: [
          {
            name: 'tasks',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'Task',
                  ofType: null,
                },
              },
            },
            args: [],
          },
          {
            name: 'users',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'LIST',
                ofType: {
                  kind: 'OBJECT',
                  name: 'User',
                  ofType: null,
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'Task',
        fields: [
          {
            name: 'authorId',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'completed',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'createdAt',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'notes',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'subtitle',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'title',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'updatedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'OBJECT',
        name: 'User',
        fields: [
          {
            name: 'createdAt',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'email',
            type: {
              kind: 'NON_NULL',
              ofType: {
                kind: 'SCALAR',
                name: 'Any',
              },
            },
            args: [],
          },
          {
            name: 'id',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'updatedAt',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
          {
            name: 'username',
            type: {
              kind: 'SCALAR',
              name: 'Any',
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: 'SCALAR',
        name: 'Any',
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery

// export const GetAllTasksDocument = gql`
//     query GetAllTasks {
//   tasks {
//     id
//     title
//     subtitle
//     notes
//     completed
//     createdAt
//     updatedAt
//     authorId
//   }
// }
//     `;

export function useGetAllTasksQuery(
  options?: Omit<Urql.UseQueryArgs<GetAllTasksQueryVariables>, 'query'>,
) {
  return Urql.useQuery<GetAllTasksQuery, GetAllTasksQueryVariables>({
    query: GetAllTasksDocument,
    ...options,
  })
}
