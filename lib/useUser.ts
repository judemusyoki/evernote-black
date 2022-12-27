import { CombinedError, useQuery } from 'urql'

import { useEffect, useState } from 'react'

import {
  GetUserDocument,
  GetUserQuery,
  GetUserQueryVariables,
  User,
} from '@/graphql/generated'

type UserData = User | undefined

type ErrorData = CombinedError | undefined

type UseUserResults = {
  fetching: boolean
  user: UserData
  error: ErrorData
}

type UseUserParams = {
  userId: string
}

export const useUser = (params: UseUserParams): UseUserResults => {
  const [user, setUser] = useState<User>()
  const { userId } = params

  const [{ data, fetching, error }] = useQuery<
    GetUserQuery,
    GetUserQueryVariables
  >({
    query: GetUserDocument,
    variables: { userId: userId },
  })

  useEffect(() => {
    if (data) {
      const { user } = data
      setUser(user as User)
    }
  }, [data])

  return { fetching, user, error }
}
