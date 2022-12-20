import {
  Box,
  Button,
  List,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material'
import Head from 'next/head'
import Image from 'next/image'

import { useMutation, useQuery } from 'urql'
import { TaskForm } from '../components/form/taskForm'
import { TaskList } from '../components/tasks'
import {
  CreateOneTaskDocument,
  GetAllTasksDocument,
  GetAllTasksQuery,
  Task,
} from '../graphql/generated'

const newTask = {
  title: 'new task 2',
  subtitle: 'somds',
  notes: 'dedfer',
  completed: false,
  authorId: 'a035bb44-94c3-49f6-87b8-cd2b003feba2',
}

export default function Home() {
  const [{ data, fetching, error }] = useQuery({
    query: GetAllTasksDocument,
  })

  const [createTaskResult, createTask] = useMutation(CreateOneTaskDocument)

  const variables = { data: newTask }

  if (!data || fetching) return <h3>Loading</h3>

  const { tasks } = data
  console.log('TASKS...', tasks)

  // const addTask = () => {
  //   createTask(variables).then((result) => {
  //     console.log('Updated successfully...', result)
  //     // The result is almost identical to `updateTodoResult` with the exception
  //     // of `result.fetching` not being set.
  //     // It is an OperationResult.
  //   })
  // }

  return (
    <Box sx={container}>
      <Paper sx={mainContainer} elevation={8}>
        <Box sx={listContainer}>
          <TaskList />
        </Box>

        {/* <Button variant="contained" color="primary" onClick={addTask}>
        CLICK TO CREATER TASK
        </Button> */}

        <Box sx={listContainer}>
          <TaskForm />
        </Box>
      </Paper>
    </Box>
  )
}

const container = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: 10,
  marginLeft: 'auto',
  marginRight: 'auto',
  width: '50%',
}

const mainContainer = {
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: 4,
}

const listContainer = {
  width: '50%',
}
