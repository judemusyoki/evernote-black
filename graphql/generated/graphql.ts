import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables extends { [key: string]: any }>(client: GraphQLClient, query: string, variables?: TVariables, requestHeaders?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request({
    document: query,
    variables,
    requestHeaders
  });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  tasks: Array<Maybe<Task>>;
  users: Array<Maybe<User>>;
};

export type Task = {
  __typename?: 'Task';
  authorId?: Maybe<Scalars['String']>;
  completed?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  notes?: Maybe<Scalars['String']>;
  subtitle?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdAt?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  id?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  username?: Maybe<Scalars['String']>;
};

export type GetAllTasksQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTasksQuery = { __typename?: 'Query', tasks: Array<{ __typename?: 'Task', id?: string | null, title?: string | null, subtitle?: string | null, notes?: string | null, completed?: boolean | null, createdAt?: string | null, updatedAt?: string | null, authorId?: string | null } | null> };


export const GetAllTasksDocument = `
    query GetAllTasks {
  tasks {
    id
    title
    subtitle
    notes
    completed
    createdAt
    updatedAt
    authorId
  }
}
    `;
export const useGetAllTasksQuery = <
      TData = GetAllTasksQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables?: GetAllTasksQueryVariables,
      options?: UseQueryOptions<GetAllTasksQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<GetAllTasksQuery, TError, TData>(
      variables === undefined ? ['GetAllTasks'] : ['GetAllTasks', variables],
      fetcher<GetAllTasksQuery, GetAllTasksQueryVariables>(client, GetAllTasksDocument, variables, headers),
      options
    );