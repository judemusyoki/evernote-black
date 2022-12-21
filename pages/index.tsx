import { Box, Paper } from '@mui/material'

import { TaskForm } from '../components/form'
import { TaskList } from '../components/tasks'
import { TaskDisplay } from '../components/tasks/task/taskDisplay'
import { useTaskViewContext } from '../context'

export default function Home() {
  const { taskId, setTaskId } = useTaskViewContext()

  console.log('context task id', taskId)

  return (
    <Box sx={container}>
      <Paper sx={mainContainer} elevation={8}>
        <Box sx={listContainer}>
          <TaskList />
        </Box>

        {taskId ? (
          <Box sx={listContainer}>
            <TaskDisplay taskId={taskId} setTaskId={setTaskId} />
          </Box>
        ) : (
          <Box sx={listContainer}>
            <TaskForm />
          </Box>
        )}
      </Paper>
    </Box>
  )
}

const container = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
}

const mainContainer = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: 4,
}

const listContainer = {
  width: '50%',
}
