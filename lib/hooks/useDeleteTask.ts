import { ApolloError, gql, useMutation } from '@apollo/client'
import { Task } from '@prisma/client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import { GET_TASKS } from './useTasks'

type HandleMethod = (task: Task) => Promise<void>

const DELETE_TASK = gql`
  mutation deleteTask($id: String!) {
    deleteTask(id: $id) {
      id
    }
  }
`

export const useDeleteTask = (): [
  HandleMethod,
  {
    fetching: boolean
  },
] => {
  const [fetching, setFetching] = useState<boolean>(false)
  const [error, setError] = useState<ApolloError>()

  const [deleteTask, { loading: createFetching, error: createError }] =
    useMutation(DELETE_TASK, {
      refetchQueries: [{ query: GET_TASKS }],
    })

  useEffect(() => {
    if (createFetching) setFetching(createFetching)
  }, [createFetching])

  useEffect(() => {
    if (createError) {
      setError(createError)
      setFetching(false)
    }
  }, [createError])

  const handleDeleteTask: HandleMethod = async (task: Task) => {
    const { id, title, subtitle, notes, completed, authorId } = task
    const variables = {
      id,
      title,
      subtitle,
      notes,
      completed,
      authorId,
    }
    try {
      toast.promise(deleteTask({ variables }), {
        loading: 'Deleting task..',
        success: 'Task successfully deleted!🎉',
        error: `Something went wrong 😥 Please try again -  ${error}`,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return [handleDeleteTask, { fetching }]
}
