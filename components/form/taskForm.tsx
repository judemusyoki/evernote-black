import { Box, Button, Grid, Typography } from '@mui/material'
import { Form, Formik, Field, FormikProps } from 'formik'
import { TextField } from 'formik-mui'
import React, { FC } from 'react'
import { Task } from '../../graphql/generated'
import { useCreateTask } from '../../lib/useCreateTask'

export type FormValues = {
  title: string
  subtitle: string
  notes: string
  completed: boolean
  authorId: string
  createdAt: Date
  updatedAt: Date
}

type TaskFormProps = {
  task?: Task
  // handleToggle?: () => void
}

export const TaskForm: FC<TaskFormProps> = ({ task }) => {
  const [createTask] = useCreateTask()

  const initialValues: FormValues = {
    title: '',
    subtitle: '',
    notes: '',
    completed: false,
    authorId: 'a035bb44-94c3-49f6-87b8-cd2b003feba2',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  }

  const handleSubmit = async (values: FormValues) => {
    await createTask(values)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ resetForm }: FormikProps<FormValues>) => (
        <Grid container sx={taskFormContainer}>
          <Form>
            <Typography variant={'h5'}>Create Task</Typography>
            <Box m={1}>
              <Field
                sx={{ width: '100%' }}
                component={TextField}
                label="What is your task?"
                size="small"
                variant="outlined"
                name="title"
                required={true}
              />
            </Box>

            <Box m={1}>
              <Field
                sx={{ width: '100%' }}
                component={TextField}
                label="A little subtext never goes too far..."
                size="small"
                variant="outlined"
                name="subtitle"
              />
            </Box>

            <Box m={1}>
              <Field
                sx={{ width: '100%' }}
                component={TextField}
                placeholder="Feel free to share more details about the task"
                name="notes"
                multiline={true}
                minRows={4}
              />
            </Box>

            <Box m={1} sx={buttonContainer}>
              <Button variant="contained" color="primary" type="submit">
                {task ? 'Update Task' : 'Add Task'}
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="reset"
                onClick={() => resetForm}
              >
                {'Cancel'}
              </Button>
            </Box>
          </Form>
        </Grid>
      )}
    </Formik>
  )
}

const taskFormContainer = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}

const buttonContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}
