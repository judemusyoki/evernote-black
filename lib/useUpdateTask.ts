import { useEffect, useState } from 'react'
import { CombinedError, useMutation } from 'urql'

import { FormValues } from '@/components/form'
import {
  Task,
  TaskUpdateInput,
  UpdateOneTaskDocument,
  UpdateOneTaskMutationVariables,
} from '@/graphql/generated'
import { convertDataToSet } from './convertDataToSet'

type HandleMethod = (values: FormValues) => Promise<TaskUpdateInput | undefined>

export const useUpdateTask = (): [
  HandleMethod,
  {
    data: TaskUpdateInput | undefined
    fetching: boolean
    error: CombinedError | undefined
  },
] => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [resultData, setResultData] = useState<TaskUpdateInput>()
  const [error, setError] = useState<CombinedError>()

  const [{ fetching: updateFetching, error: updateError }, updateTask] =
    useMutation<UpdateOneTaskMutationVariables>(UpdateOneTaskDocument)

  useEffect(() => {
    if (updateFetching) setFetching(updateFetching)
  }, [updateFetching])

  useEffect(() => {
    if (updateError) {
      setError(updateError)
      setFetching(false)
    }
  }, [updateError])

  const handleUpdateTask: HandleMethod = async (updatedTask: FormValues) => {
    const {
      authorId,
      completed,
      createdAt,
      id,
      notes,
      subtitle,
      title,
      updatedAt,
    } = updatedTask

    const updatedTask2: Task = {
      id: id as string,
      title: title,
      subtitle: subtitle,
      notes: notes,
      completed: completed,
      createdAt: createdAt,
      updatedAt: updatedAt,
      authorId: authorId,
    }

    const convertedUpdatedTask: TaskUpdateInput = convertDataToSet(updatedTask2)

    console.log('converted...', convertedUpdatedTask)

    const variables = { task: convertedUpdatedTask, taskId: updatedTask2.id }
    setFetching(true)

    const { data } = await updateTask(variables)

    setFetching(false)
    setResultData(data?.task)

    return data?.task
  }

  return [handleUpdateTask, { data: resultData, fetching, error }]
}
