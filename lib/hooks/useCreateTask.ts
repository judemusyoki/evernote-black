import { ApolloError, gql, useMutation } from '@apollo/client'
import { User } from '@prisma/client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useRouter } from 'next/router'

import { FormValues } from '@/components/form'

type HandleMethod = (formValues: FormValues, user: User) => Promise<void>

const CreateTaskMutation = gql`
  mutation createTask(
    $title: String!
    $subtitle: String
    $notes: String
    $completed: Boolean!
    $authorId: String!
  ) {
    createTask(
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
      createdAt
      updatedAt
    }
  }
`

export const useCreateTask = (): [
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
  // Quick safety check - if the new comment is already
  // present in the cache, we don't need to add it again.
  // if (existingCommentRefs.some(
  //   ref => readField('id', ref) === newComment.id
  // )) {
  //   return existingCommentRefs;
  // }

  // return [...existingCommentRefs, newCommentRef];

  const [createTask, { loading: createFetching, error: createError }] =
    useMutation(CreateTaskMutation, {
      update(cache, mutationResult) {
        cache.modify({
          fields: {
            tasks: (previous, { toReference }) => {
              return [...previous, toReference(mutationResult.data.createTask)]
            },
          },
        })
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

  const handleCreateTask: HandleMethod = async (
    formValues: FormValues,
    user: User,
  ) => {
    formValues.authorId = user.id
    formValues.completed = false
    const { title, subtitle, notes, completed, authorId } = formValues

    const variables = { title, subtitle, notes, completed, authorId }

    try {
      toast
        .promise(createTask({ variables }), {
          loading: 'Creating new task..',
          success: 'Task successfully created!🎉',
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

  return [handleCreateTask, { fetching, error }]
}
