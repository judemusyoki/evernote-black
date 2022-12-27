import { Form, Formik, Field, FormikProps } from 'formik'
import { TextField } from 'formik-mui'

import React, { FC, useEffect, useRef } from 'react'

import { Box, Button, Grid, Typography } from '@mui/material'

import { Task } from '@/graphql/generated'
import { useCreateTask, useUpdateTask, useUser } from '@/lib/index'

export type FormValues = {
  title: string
  subtitle: string
  notes: string
  completed: boolean
  authorId: string
  createdAt?: Date
  updatedAt?: Date
  id?: string
}

type TaskFormProps = {
  onCancel: () => void
  task?: Task
}

export const TaskForm: FC<TaskFormProps> = ({ task, onCancel }) => {
  const { user } = useUser({ userId: '2c636d97-51b1-4903-b061-6f966162dfa2' })
  const [createTask] = useCreateTask()
  const [updateTask] = useUpdateTask()

  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const initialValues: FormValues = {
    id: task?.id,
    title: task?.title || '',
    subtitle: task?.subtitle || '',
    notes: task?.notes || '',
    completed: task?.completed || false,
    authorId: user?.id as string,
    createdAt: task?.createdAt,
    updatedAt: task && new Date(Date.now()),
  }

  const handleCancel = () => {
    onCancel()
  }

  const handleSubmit = (values: FormValues, formikBag: { resetForm: any }) => {
    const { resetForm } = formikBag

    if (task) {
      updateTask(values)
      resetForm()
    }
    createTask(values)
    resetForm()
  }

  const formTitle: string = task ? 'Update Task' : 'Create Task'

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ resetForm }: FormikProps<FormValues>) => (
        <Grid container sx={taskFormContainer}>
          <Form>
            <Typography variant={'h5'}>{formTitle}</Typography>
            <Box m={1}>
              <Field
                sx={{ width: '100%' }}
                component={TextField}
                label="What is your task?"
                size="small"
                variant="outlined"
                name="title"
                required={true}
                autoFocus={true}
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
                onClick={handleCancel}
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
