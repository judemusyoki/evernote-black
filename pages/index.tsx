import { executeExchange } from '@urql/exchange-execute'
import {
  ssrExchange,
  dedupExchange,
  cacheExchange,
  useQuery,
  Query,
} from 'urql'

import { useEffect, useState } from 'react'

import { withUrqlClient, initUrqlClient } from 'next-urql'

import { Box, Divider } from '@mui/material'

import { TaskList } from '@/components/tasks'
import { TaskDisplay } from '@/components/tasks/task/taskDisplay'
import { Task } from '@/graphql/generated'
import GET_ALL_TASKS from '@/graphql/queries/get-tasks.graphql'
import { useTasks } from '@/lib/index'
import { LoadingComponent } from '@/utils/loadingComponent'

import { PrismaClient } from '../prisma'
import { generateSchema } from './api/generate-schema'

const prisma = new PrismaClient()

export const HomePage = (props) => {
  // const { fetching: loading, tasks } = useTasks()
  const [tasks, setTasks] = useState<Task[]>(JSON.parse(props.tasks))
  const [taskId, setTaskId] = useState<string>('')
  const [displayTask, setDisplayTask] = useState<Task>()

  console.log('THES SERVERSIDE DATA...', JSON.parse(props.tasks))

  useEffect(() => {
    if (taskId && tasks) {
      const currentTask = tasks.find((task: Task) => task.id === taskId)
      setDisplayTask(currentTask)
    } else {
      setDisplayTask(undefined)
    }
  }, [taskId, tasks])

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
  const fetchedTasks = await prisma.task.findMany()
  const tasks = JSON.stringify(fetchedTasks)

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
