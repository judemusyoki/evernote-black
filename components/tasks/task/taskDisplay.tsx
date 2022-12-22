import { Box, IconButton, Paper, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { FC } from 'react'
import { useTasks } from '../../../lib'
import { LoadingComponent } from '../../../utils/loadingComponent'
import { Task } from '../../../graphql/generated'
import { SetTask } from '../../../context'
import { useDeleteTask } from '../../../lib/useDeleteTask'

type TaskDisplayProps = {
  taskId: string
  setTaskId: SetTask
}

export const TaskDisplay: FC<TaskDisplayProps> = ({ taskId, setTaskId }) => {
  const { fetching: loading, tasks } = useTasks()
  const [deleteTask] = useDeleteTask()

  const handleClose = () => {
    setTaskId(null)
  }

  const handleDelete = (id: string) => {
    deleteTask(id)
    handleClose()
  }

  if (!tasks || loading) return <LoadingComponent />

  const currentTask = tasks.find((task: Task) => task.id === taskId)

  return currentTask ? (
    <Paper sx={taskItemContainer} elevation={8}>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Box sx={taskItem} p={3}>
        <Typography variant="h4">{currentTask.title}</Typography>
        <Typography variant="subtitle1">{currentTask.subtitle}</Typography>
        <Typography variant="body2">{currentTask.notes}</Typography>
      </Box>

      <IconButton>
        <EditIcon />
      </IconButton>

      <IconButton onClick={() => handleDelete(currentTask.id)}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  ) : (
    <Box>Error no task selected</Box>
  )
}

const taskItemContainer = {
  borderRadius: 5,
}

const taskItem = {
  width: '100%',
  minHeight: 200,
}
