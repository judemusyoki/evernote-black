import { Box, List, ListItemText } from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import { useQuery } from 'urql'
import { TaskForm } from '../components/taskForm'
import {
  GetAllTasksDocument,
  GetAllTasksQuery,
  Task,
} from '../graphql/generated'

export default function Home() {
  const [{ data, fetching, error }] = useQuery({
    query: GetAllTasksDocument,
  })

  if (!data || fetching) return <h3>Loading</h3>

  const { tasks } = data

  return (
    <>
      <Box>
        <List dense={true}>
          {tasks?.map((task: Task) => {
            return <ListItemText key={task.id} primary={task.title} />
          })}
        </List>
      </Box>

      <Box>
        <TaskForm />
      </Box>
    </>
  )
}
