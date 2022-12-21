import { useEffect, useState } from 'react'
import { CombinedError, useMutation } from 'urql'
import { FormValues } from '../components/form'
import {
  CreateOneTaskDocument,
  CreateOneTaskMutationVariables,
  TaskCreateInput,
} from '../graphql/generated'

type HandleMethod = (values: FormValues) => Promise<TaskCreateInput | undefined>

export const useCreateTask = (): [
  HandleMethod,
  {
    data: TaskCreateInput | undefined
    fetching: boolean
    error: CombinedError | undefined
  },
] => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [resultData, setResultData] = useState<TaskCreateInput>()
  const [error, setError] = useState<CombinedError>()

  const [{ fetching: createFetching, error: createError }, createTask] =
    useMutation<CreateOneTaskMutationVariables>(CreateOneTaskDocument)

  useEffect(() => {
    if (createFetching) setFetching(createFetching)
  }, [createFetching])

  useEffect(() => {
    if (createError) {
      setError(createError)
      setFetching(false)
    }
  }, [createError])

  const handleCreateTask: HandleMethod = async (values: FormValues) => {
    const variables = { data: values }
    setFetching(true)

    const { data } = await createTask(variables)

    setFetching(false)
    setResultData(data?.data)

    return data?.data
  }

  return [handleCreateTask, { data: resultData, fetching, error }]
}
