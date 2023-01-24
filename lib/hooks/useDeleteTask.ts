import { ApolloError, gql, useMutation } from '@apollo/client'
import { Task } from '@prisma/client'

import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type HandleMethod = (task: Task) => Promise<void>

const DeleteTaskMutation = gql`
  mutation deleteTask(
    $id: String!
    $title: String!
    $subtitle: String
    $notes: String
    $completed: Boolean
    $authorId: String!
  ) {
    deleteTask(
      id: $id
      title: $title
      subtitle: $subtitle
      notes: $notes
      completed: $completed
      authorId: $authorId
    ) {
      title
      subtitle
      notes
      completed
      authorId
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
    useMutation(DeleteTaskMutation)

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
