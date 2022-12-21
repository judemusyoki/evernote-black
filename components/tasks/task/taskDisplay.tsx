import { Box, IconButton, Paper, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { FC } from 'react'
import { useTasks } from '../../../lib'
import { LoadingComponent } from '../../../utils/loadingComponent'
import { Task } from '../../../graphql/generated'
import { SetTask } from '../../../context'

type TaskDisplayProps = {
  taskId: string
  setTaskId: SetTask
}

export const TaskDisplay: FC<TaskDisplayProps> = ({ taskId, setTaskId }) => {
  const { fetching: loading, tasks } = useTasks()

  const handleClose = () => {
    setTaskId(null)
  }

  if (!tasks || loading) return <LoadingComponent />

  const currentTask = tasks.find((task: Task) => task.id === taskId)

  return (
    <Paper sx={taskItemContainer} elevation={8}>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Box sx={taskItem} p={3}>
        <Typography variant="h4">{currentTask?.title}</Typography>
        <Typography variant="subtitle1">{currentTask?.subtitle}</Typography>
        <Typography variant="body2">{currentTask?.notes}</Typography>
      </Box>

      <IconButton>
        <EditIcon />
      </IconButton>

      <IconButton>
        <DeleteIcon />
      </IconButton>
    </Paper>
  )
}

const taskItemContainer = {
  borderRadius: 5,
}

const taskItem = {
  width: '100%',
  minHeight: 200,
}
