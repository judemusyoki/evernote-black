import { useEffect, useState } from 'react'
import { useQuery } from 'urql'
import {
  GetAllTasksDocument,
  GetAllTasksQueryVariables,
  Task,
} from '../graphql/generated'

export const useTasks = () => {
  const [loading, setLoading] = useState<boolean>(true)
  const [tasks, setTasks] = useState<Task[]>()

  const [{ data, fetching, error }] = useQuery<GetAllTasksQueryVariables>({
    query: GetAllTasksDocument,
  })

  useEffect(() => {
    setLoading(fetching)
  }, [fetching])

  useEffect(() => {
    if (data) {
      const { tasks } = data
      setTasks(tasks as Task[])
    }
  }, [data])

  return { loading, tasks }
}
