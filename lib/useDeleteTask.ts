import { useEffect, useState } from 'react'
import { CombinedError, useMutation } from 'urql'

import {
  DeleteOneTaskDocument,
  DeleteOneTaskMutationVariables,
} from '@/graphql/generated'

type DeletedId = {
  taskId: string
}

type HandleMethod = (id: string) => Promise<DeletedId | undefined>

export const useDeleteTask = (): [
  HandleMethod,
  {
    data: DeletedId | undefined
    fetching: boolean
    error: CombinedError | undefined
  },
] => {
  const [fetching, setFetching] = useState<boolean>(true)
  const [resultData, setResultData] = useState<DeletedId>()
  const [error, setError] = useState<CombinedError>()

  const [{ fetching: deleteFetching, error: deleteError }, deleteTask] =
    useMutation<DeleteOneTaskMutationVariables>(DeleteOneTaskDocument)

  useEffect(() => {
    if (deleteFetching) setFetching(deleteFetching)
  }, [deleteFetching])

  useEffect(() => {
    if (deleteError) {
      setError(deleteError)
      setFetching(false)
    }
  }, [deleteError])

  const handleDeleteTask: HandleMethod = async (id: string) => {
    const variables = { taskId: id }
    setFetching(true)

    const { data: deletedId } = await deleteTask(variables)

    if (deletedId) {
      setFetching(false)
      setResultData(deletedId)
      return deletedId
    }
  }

  return [handleDeleteTask, { data: resultData, fetching, error }]
}
