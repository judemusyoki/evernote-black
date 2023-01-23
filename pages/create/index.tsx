import { getSession } from '@auth0/nextjs-auth0'
import { Task, User } from '@prisma/client'

import React from 'react'

import type { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'

import { TaskForm } from '@/components/form'
import { useTasks } from '@/lib/index'
import { prisma } from '@/prisma/index'
import { LoadingComponent } from '@/utils/loadingComponent'

//@ts-ignore
export default function Create(props) {
  const { user } = props
  const router = useRouter()
  // const { fetching: loading, tasks } = useTasks()

  const handleCancel = () => {
    router.push('/')
  }

  //if (!tasks || loading) return <LoadingComponent />

  const taskId = router.query.taskId as string
  //const updateTask = tasks.find((task: Task) => task.id === taskId)

  return <TaskForm user={user} onCancel={handleCancel} />
}

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  const sessionUser = session?.user

  const fetchedUser = await prisma.user.findUnique({
    where: { email: sessionUser?.email },
  })

  const user = JSON.parse(JSON.stringify(fetchedUser)) as User

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    }
  }

  return {
    props: { user },
  }
}
