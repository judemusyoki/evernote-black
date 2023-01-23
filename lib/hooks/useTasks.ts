import { ApolloError, gql, useQuery } from '@apollo/client'

import { useEffect, useState } from 'react'

import {
  GetAllTasksDocument,
  GetAllTasksQueryVariables,
  Task,
} from '@/graphql/generated'

type ErrorData = ApolloError | undefined

type UseTasksResults = {
  fetching: boolean
  tasks: Task[] | undefined
  error: ErrorData
}

const AllTasksQuery = gql`
  query {
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
`

export const useTasks = (): UseTasksResults => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [error, setError] = useState<ApolloError>()
  const [tasks, setTasks] = useState<Task[]>()
  const { data, loading, error: tasksError } = useQuery(AllTasksQuery)

  useEffect(() => {
    if (data) {
      const { tasks } = data
      setTasks(tasks as Task[])
    }
  }, [data])

  useEffect(() => {
    setFetching(loading)
  }, [loading])

  useEffect(() => {
    setError(tasksError)
  }, [tasksError])

  return { fetching, tasks, error }
}

// const [tasks, setTasks] = useState<Task[]>()

//   const [{ data, fetching, error }] = useQuery<GetAllTasksQueryVariables>({
//     query: GetAllTasksDocument,
//   })

//   useEffect(() => {
//     if (data) {
//       const { tasks } = data
//       setTasks(tasks as Task[])
//     }
//   }, [data])
