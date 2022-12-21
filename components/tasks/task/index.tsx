import React, { FC } from 'react'

import {
  Box,
  Checkbox,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import FlagIcon from '@mui/icons-material/Flag'

import { Task } from '../../../graphql/generated'
import { useTaskViewContext } from '../../../context'

type TaskItemProps = {
  task: Task
}

export const TaskItem: FC<TaskItemProps> = ({ task }) => {
  const { setTaskId } = useTaskViewContext()

  const handleSelectTask = (id: string) => {
    setTaskId(id)
  }

  return (
    <Box sx={taskItemContainer}>
      <ListItem key={task.id} sx={listItem}>
        <ListItemIcon sx={listItem}>
          <Checkbox
            edge="end"
            checked={false}
            // onClick={() => toggleTask(currentTask?.id)}
          />
        </ListItemIcon>

        <ListItemText
          primary={task?.title}
          onClick={() => handleSelectTask(task.id)}
        />
        <ListItemIcon>
          <FlagIcon color={'warning'} />
        </ListItemIcon>

        {/* <ListItemSecondaryAction>
          <ListItemIcon>
            <FlagIcon color={'disabled'} />
          </ListItemIcon>
        </ListItemSecondaryAction> */}
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
