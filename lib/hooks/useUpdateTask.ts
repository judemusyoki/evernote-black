import { ApolloError, gql, useMutation } from '@apollo/client'
import { Task } from '@prisma/client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'

import { FormValues } from '@/components/form'

import { GET_TASKS } from './useTasks'

type HandleMethod = (updatedTask: Task) => Promise<void>

const UPDATE_TASK = gql`
  mutation updateTask(
    $id: String!
    $title: String!
    $subtitle: String
    $notes: String
    $completed: Boolean!
    $authorId: String!
  ) {
    updateTask(
      id: $id
      title: $title
      subtitle: $subtitle
      notes: $notes
      completed: $completed
      authorId: $authorId
    ) {
      id
      title
      subtitle
      notes
      completed
      authorId
    }
  }
`

export const useUpdateTask = (): [
  HandleMethod,
  {
    fetching: boolean
    error: ApolloError | undefined
  },
] => {
  const router = useRouter()
  const { reset } = useForm<FormValues>()
  const [fetching, setFetching] = useState<boolean>(false)
  const [error, setError] = useState<ApolloError>()

  const [updateTask, { loading: updateFetching, error: updateError }] =
    useMutation(UPDATE_TASK, {
      refetchQueries: [{ query: GET_TASKS }],
    })

  useEffect(() => {
    if (updateFetching) setFetching(updateFetching)
  }, [updateFetching])

  useEffect(() => {
    if (updateError) {
      setError(updateError)
      setFetching(false)
    }
  }, [updateError])

  const handleUpdateTask: HandleMethod = async (updatedTask: Task) => {
    const { id, title, subtitle, notes, completed, authorId } = updatedTask

    const variables = { id, title, subtitle, notes, completed, authorId }

    try {
      toast
        .promise(updateTask({ variables }), {
          loading: 'Updating task..',
          success: 'Task successfully updating!🎉',
          error: `Something went wrong 😥 Please try again -  ${error}`,
        })
        .finally(() => {
          router.push('/')
          reset({
            title: undefined,
            subtitle: undefined,
            notes: undefined,
          })
        })
    } catch (error) {
      console.error(error)
    }
  }

  return [handleUpdateTask, { fetching, error }]
}
