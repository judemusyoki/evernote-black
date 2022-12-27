import { useEffect, useState } from 'react'

import { Box, Divider } from '@mui/material'

import { TaskList } from '@/components/tasks'
import { TaskDisplay } from '@/components/tasks/task/taskDisplay'
import { Task } from '@/graphql/generated'
import { useTasks } from '@/lib/index'
import { LoadingComponent } from '@/utils/loadingComponent'

export const HomePage = () => {
  const { fetching: loading, tasks } = useTasks()
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

  if (!tasks || loading) return <LoadingComponent />

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
