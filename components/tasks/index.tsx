import React from 'react'

import { Box, List, Typography } from '@mui/material'

import { useTasks } from '../../lib/useTasks'
import { TaskItem } from './task'

import { Task } from '../../graphql/generated'
import { LoadingComponent } from '../../utils/loadingComponent'

export const TaskList = () => {
  const { fetching: loading, tasks } = useTasks()

  if (!tasks || loading) return <LoadingComponent />

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
