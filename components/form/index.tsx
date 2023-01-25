import { Task, User } from '@prisma/client'

import React, { FC, useEffect, useRef } from 'react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { Toaster } from 'react-hot-toast'

import { Box, Button, Grid, TextField, Typography } from '@mui/material'

import { useCreateTask } from '@/lib/index'
import { LoadingComponent } from '@/utils/loadingComponent'

export type FormValues = {
  title: String
  subtitle: String
  notes: String
  completed: Boolean
  authorId: String
  createdAt?: String
  updatedAt?: String
  id?: String
}

type TaskFormProps = {
  user: User
  onCancel: () => void
  task?: Task
}

export type FormData = {
  formValues: FormValues
  user: User
}

export const TaskForm: FC<TaskFormProps> = ({ user, task, onCancel }) => {
  const [handleCreateTask, { fetching }] = useCreateTask()
  const { handleSubmit, control } = useForm<FormValues>()

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    await handleCreateTask(data, user)
  }

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
    authorId: user?.id,
  }

  const handleCancel = () => {
    onCancel()
  }

  const formTitle: string = task ? 'Update Task' : 'Create Task'

  return (
    <Grid container sx={taskFormContainer}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant={'h5'}>{formTitle}</Typography>
        <Box m={1}>
          <Controller
            name={'title'}
            control={control}
            defaultValue={initialValues.title}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                sx={{ width: '100%' }}
                label="What is your task?"
                size="small"
                variant="outlined"
                required={true}
                autoFocus={true}
              />
            )}
          />
        </Box>

        <Box m={1}>
          <Controller
            name={'subtitle'}
            control={control}
            defaultValue={initialValues.subtitle}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                sx={{ width: '100%' }}
                label="A little subtext never goes too far..."
                size="small"
                variant="outlined"
              />
            )}
          />
        </Box>

        <Box m={1}>
          <Controller
            name={'subtitle'}
            control={control}
            defaultValue={initialValues.notes}
            render={({ field: { onChange, value } }) => (
              <TextField
                onChange={onChange}
                value={value}
                sx={{ width: '100%' }}
                placeholder="Feel free to share more details about the task"
                name="notes"
                multiline={true}
                minRows={4}
              />
            )}
          />
        </Box>

        {fetching ? (
          <LoadingComponent />
        ) : (
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
        )}
      </form>
    </Grid>
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
