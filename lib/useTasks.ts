import { CombinedError, useQuery } from 'urql'

import { useEffect, useState } from 'react'

import {
  GetAllTasksDocument,
  GetAllTasksQueryVariables,
  Task,
} from '@/graphql/generated'

type ErrorData = CombinedError | undefined

type UseTasksResults = {
  fetching: boolean
  tasks: Task[] | undefined
  error: ErrorData
}

export const useTasks = (): UseTasksResults => {
  const [tasks, setTasks] = useState<Task[]>()

  const [{ data, fetching, error }] = useQuery<GetAllTasksQueryVariables>({
    query: GetAllTasksDocument,
  })

  useEffect(() => {
    if (data) {
      const { tasks } = data
      setTasks(tasks as Task[])
    }
  }, [data])

  return { fetching, tasks, error }
}
