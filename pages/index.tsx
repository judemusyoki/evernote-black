import { Box, Paper } from '@mui/material'

import { TaskForm } from '../components/form/taskForm'
import { TaskList } from '../components/tasks'

export default function Home() {
  return (
    <Box sx={container}>
      <Paper sx={mainContainer} elevation={8}>
        <Box sx={listContainer}>
          <TaskList />
        </Box>

        <Box sx={listContainer}>
          <TaskForm />
        </Box>
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
