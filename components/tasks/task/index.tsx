import React, { FC } from 'react'

import FlagIcon from '@mui/icons-material/Flag'
import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'

import { FormValues } from '@/components/form'
import { Task } from '@/graphql/generated'
import { useUpdateTask } from '@/lib/index'

type TaskItemProps = {
  task: Task
  selectTask: (id: string) => void
}

export const TaskItem: FC<TaskItemProps> = ({ task, selectTask }) => {
  const [updateTask] = useUpdateTask()

  const handleSelectTask = (id: string) => {
    selectTask(id)
  }

  const handleToggleTask = () => {
    task.completed = !task.completed
    updateTask(task as FormValues)
  }

  return (
    <Box sx={taskItemContainer}>
      <ListItem key={task.id} sx={listItem}>
        <ListItemIcon sx={listItem}>
          <Checkbox
            edge="end"
            checked={task.completed}
            onClick={handleToggleTask}
          />
        </ListItemIcon>

        <ListItemText
          primary={task?.title}
          onClick={() => handleSelectTask(task.id)}
        />
        <ListItemIcon>
          <FlagIcon color={'disabled'} />
        </ListItemIcon>
      </ListItem>
    </Box>
  )
}

const taskItemContainer = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
}

const listItem = {
  padding: 0,
  margin: 0,
  minHeight: 'fit-content',
  '&:hover': {
    backgroundColor: '#D6DDEB',
  },
}
