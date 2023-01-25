import { ApolloError, gql, useQuery } from '@apollo/client'
import { Task } from '@prisma/client'

import { useEffect, useState } from 'react'

type ErrorData = ApolloError | undefined

type UseTasksResults = {
  fetching: boolean
  tasks: Task[] | []
  error: ErrorData
}

export const GET_TASKS = gql`
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
  const [tasks, setTasks] = useState<Task[]>([])
  const { data, loading, error: tasksError } = useQuery(GET_TASKS)

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
