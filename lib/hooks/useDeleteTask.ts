import {
  ApolloError,
  gql,
  Reference,
  StoreObject,
  useMutation,
} from '@apollo/client'
import { Task } from '@prisma/client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type HandleMethod = (task: Task) => Promise<void>

const DeleteTaskMutation = gql`
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
    useMutation(DeleteTaskMutation, {
      update(cache, mutationResult) {
        cache.modify({
          fields: {
            tasks(existingTaskRefs, { readField }) {
              return existingTaskRefs.filter(
                (taskRef: Reference | StoreObject | undefined) => {
                  return (
                    mutationResult.data.deleteTask.id !==
                    readField('id', taskRef)
                  )
                },
              )
            },
          },
        })
        cache.gc()
      },
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
