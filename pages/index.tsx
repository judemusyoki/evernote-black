import { getSession } from '@auth0/nextjs-auth0'
import { Task, User } from '@prisma/client'

import { useEffect, useState } from 'react'

import { GetServerSideProps } from 'next'

import { Box, Divider } from '@mui/material'

import { TaskList } from '@/components/tasks'
import { TaskDisplay } from '@/components/tasks/task/taskDisplay'
import { useTasks } from '@/lib/index'
import { LoadingComponent } from '@/utils/loadingComponent'

import { prisma } from '../prisma'

function HomePage(props: any) {
  const { user } = props
  const { tasks, fetching: fetchingTasks } = useTasks()

  const [taskId, setTaskId] = useState<string>('')
  const [displayTask, setDisplayTask] = useState<Task>()

  useEffect(() => {
    if (taskId && tasks) {
      const currentTask = tasks.find((task: Task) => task.id === taskId)
      setDisplayTask(currentTask)
    } else {
      setDisplayTask(undefined)
    }
  }, [taskId, tasks])

  if (!user || fetchingTasks) return <LoadingComponent />

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <TaskList tasks={tasks} setTaskId={setTaskId} />
      <Divider
        orientation="vertical"
        sx={{
          width: 30,
        }}
      />
      {taskId && <TaskDisplay task={displayTask} setTaskId={setTaskId} />}
    </Box>
  )
}

export default HomePage

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession(req, res)

  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/api/auth/login',
      },
      props: {},
    }
  }

  const sessionUser = session?.user

  const fetchedUser = await prisma.user.findUnique({
    where: { email: sessionUser?.email },
  })

  const user = JSON.parse(JSON.stringify(fetchedUser)) as User

  return {
    props: { user },
  }
}
