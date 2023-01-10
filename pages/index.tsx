import { PrismaClient } from '@prisma/client'

import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { Box, Divider } from '@mui/material'

import { TaskList } from '@/components/tasks'
import { TaskDisplay } from '@/components/tasks/task/taskDisplay'
import { Task } from '@/graphql/generated'
import { LoadingComponent } from '@/utils/loadingComponent'

import { LoginButton } from '../components/login/loginBtn'

const prisma = new PrismaClient()

export const HomePage = (props) => {
  // const { fetching: loading, tasks } = useTasks()
  const [tasks, _setTasks] = useState<Task[]>(props.tasks)
  const [taskId, setTaskId] = useState<string>('')
  const [displayTask, setDisplayTask] = useState<Task>()

  const { data: session } = useSession()

  useEffect(() => {
    if (taskId && tasks) {
      const currentTask = tasks.find((task: Task) => task.id === taskId)
      setDisplayTask(currentTask)
    } else {
      setDisplayTask(undefined)
    }
  }, [taskId, tasks])

  if (!session) return <LoginButton />

  if (!tasks) return <LoadingComponent />

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

export async function getServerSideProps(ctx) {
  console.log('CTX...', ctx)
  const fetchedTasks = await prisma.task.findMany()
  const tasks = JSON.parse(JSON.stringify(fetchedTasks))

  return {
    props: {
      tasks,
    },
  }
}

// export default withUrqlClient((ssr) => ({
//   url: '/api/graphql',
// }))(HomePage)

// 33751010
