import React from 'react'

import { Box, List, ListItemText, Typography } from '@mui/material'

import { useTasks } from '../../lib/useTasks'
import { TaskItem } from './task'

import { Task } from '../../graphql/generated'

export const TaskList = () => {
  const { loading, tasks } = useTasks()

  if (!tasks || loading) return <h3>Loading</h3>

  return (
    <Box sx={tasksContainer}>
      <Typography variant={'h5'}>Your Tasks</Typography>
      <List sx={itemsContainer} dense={true}>
        {tasks?.map((task: Task) => {
          return <TaskItem key={`item-id-${task.id}`} task={task} />
        })}
      </List>
    </Box>
  )
}

const tasksContainer = {
  cursor: 'pointer',
}

const itemsContainer = {
  height: 250,
  overflowY: 'scroll',
  overflowX: 'hidden',
}
