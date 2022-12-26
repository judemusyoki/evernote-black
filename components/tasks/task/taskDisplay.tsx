import { Box, IconButton, Paper, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import React, { Dispatch, FC, SetStateAction } from 'react'
import { LoadingComponent } from '../../../utils/loadingComponent'
import { Task } from '../../../graphql/generated'
import { SetTask } from '../../../context'
import { useDeleteTask } from '../../../lib/useDeleteTask'

type TaskDisplayProps = {
  task: Task | undefined
  setTaskId: Dispatch<SetStateAction<string>>
}

export const TaskDisplay: FC<TaskDisplayProps> = ({ task, setTaskId }) => {
  const [deleteTask] = useDeleteTask()

  const handleClose = () => {
    setTaskId('')
  }

  const handleDelete = (id: string) => {
    deleteTask(id)
    handleClose()
  }

  if (!task) return <LoadingComponent />

  return task ? (
    <Paper sx={taskItemContainer} elevation={8}>
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Box sx={taskItem} p={3}>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="subtitle1">{task.subtitle}</Typography>
        <Typography variant="body2">{task.notes}</Typography>
      </Box>

      <IconButton>
        <EditIcon />
      </IconButton>

      <IconButton onClick={() => handleDelete(task.id)}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  ) : (
    <Box>Error no task selected</Box>
  )
}

const taskItemContainer = {
  minHeight: '50vh',
  width: '100%',
}

const taskItem = {
  width: '100%',
  minHeight: 200,
}
