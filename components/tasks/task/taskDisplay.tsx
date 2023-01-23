import { gql, useMutation } from '@apollo/client'
import { Task } from '@prisma/client'

import React, { Dispatch, FC, SetStateAction } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import { useRouter } from 'next/router'

import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
// import EditIcon from '@mui/icons-material/Edit'
import { Box, IconButton, Paper, Typography } from '@mui/material'

import { useDeleteTask } from '@/lib/useDeleteTask'
import { LoadingComponent } from '@/utils/loadingComponent'

type TaskDisplayProps = {
  task: Task | undefined
  setTaskId: Dispatch<SetStateAction<string>>
}

const DeleteTaskMutation = gql`
  mutation deleteTask(
    $id: String!
    $title: String!
    $subtitle: String
    $notes: String
    $completed: Boolean
    $authorId: String!
  ) {
    deleteTask(
      id: $id
      title: $title
      subtitle: $subtitle
      notes: $notes
      completed: $completed
      authorId: $authorId
    ) {
      title
      subtitle
      notes
      completed
      authorId
    }
  }
`

// mutation DeleteOneTask($taskId: String!) {
//   deleteOneTask(where: { id: $taskId }) {
//     ...TaskDisplay
//   }
// }

export const TaskDisplay: FC<TaskDisplayProps> = ({ task, setTaskId }) => {
  //const router = useRouter()
  // const [deleteTask] = useDeleteTask()
  const [deleteTask, { loading, error }] = useMutation(DeleteTaskMutation)

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
    console.log('DELETING ID...', task)
    const { id, title, subtitle, notes, completed, authorId } = task
    const variables = {
      id,
      title,
      subtitle,
      notes,
      completed,
      authorId,
    }
    console.log('VARIABLES...', variables)
    try {
      toast.promise(deleteTask({ variables }), {
        loading: 'Deleting task..',
        success: 'Task successfully created!🎉',
        error: `Something went wrong 😥 Please try again -  ${error}`,
      })
    } catch (error) {
      console.error(error)
    }

    handleClose()
  }

  if (!task) return <LoadingComponent />

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
