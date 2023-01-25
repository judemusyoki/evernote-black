import { Task } from '@prisma/client'

import React, { Dispatch, FC, SetStateAction } from 'react'
import { Toaster } from 'react-hot-toast'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Paper, Typography } from '@mui/material'

import { useDeleteTask } from '@/lib/hooks/useDeleteTask'
import { LoadingComponent } from '@/utils/loadingComponent'

type TaskDisplayProps = {
  task: Task | undefined
  setTaskId: Dispatch<SetStateAction<string>>
}

export const TaskDisplay: FC<TaskDisplayProps> = ({ task, setTaskId }) => {
  //const router = useRouter()
  // const [deleteTask] = useDeleteTask()
  const [deleteTask, { fetching }] = useDeleteTask()

  const handleClose = () => {
    setTaskId('')
  }

  // const handleUpdate = (id: string) => {
  //   router.push({
  //     pathname: '/form',
  //     query: {
  //       taskId: id,
  //     },
  //   })
  // }

  const handleDelete = async (task: Task) => {
    await deleteTask(task).finally(() => handleClose())
  }

  if (!task || fetching) return <LoadingComponent />

  return task ? (
    <Paper sx={taskItemContainer} elevation={8}>
      <Toaster />
      <IconButton onClick={handleClose}>
        <CloseIcon />
      </IconButton>
      <Box sx={taskItem} p={3}>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="subtitle1">{task.subtitle}</Typography>
        <Typography variant="body2">{task.notes}</Typography>
      </Box>

      {/* <IconButton onClick={() => handleUpdate(task.id)}>
        <EditIcon />
      </IconButton> */}

      <IconButton onClick={() => handleDelete(task)}>
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
