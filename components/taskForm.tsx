import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material'
import React, { FC, useState } from 'react'
import { Task } from '../graphql/generated'

type TaskInputProps = {
  task?: Task
  // handleToggle?: () => void
}

export const TaskForm: FC<TaskInputProps> = ({ task }) => {
  const initialValues: Task | undefined = {
    id: '',
    title: '',
    subtitle: '',
    notes: '',
    completed: false,
    authorId: 'Priority',
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
  }

  const [currentTask, setCurrentTask] = useState<Task>({
    ...initialValues,
  })

  const handleChange = (event: any) => {
    const { value, name } = event.target
    if (currentTask) {
      setCurrentTask({
        ...currentTask,
        [name]: value,
      })
    }
  }
  return (
    <Grid container sx={inputContainer}>
      <Typography variant={'h5'}>Create Task</Typography>
      <Box m={1}>
        <TextField
          sx={textField}
          label="What is your task?"
          size="small"
          variant="outlined"
          name="title"
          value={currentTask?.title}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box m={1}>
        <TextField
          sx={textField}
          label="A little subtext never goes too far..."
          size="small"
          variant="outlined"
          name="subtitle"
          value={currentTask?.subtitle}
          onChange={(e) => handleChange(e)}
        />
      </Box>

      <Box m={1}>
        <TextareaAutosize
          placeholder="Feel free to share more details about the task"
          name="notes"
          value={currentTask?.notes || undefined}
          onChange={(e) => handleChange(e)}
          minRows={9}
          style={{ width: 400 }}
        />
      </Box>

      <Box
        m={1}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Typography
          sx={{
            marginBottom: 2,
          }}
        >
          Make Subtask
        </Typography>
        {/* <FormControl sx={select}>
          <InputLabel htmlFor="parentId">Select Task</InputLabel>
          <Select
            id="parentId"
            name="parentId"
            value={currentTask?.parentId}
            onChange={(e) => handleChange(e)}
          >
            {tasks?.map((task, index) => {
              if (index === tasks.length - 1)
                return (
                  <MenuItem key={task.id} value={undefined}>
                    None
                  </MenuItem>
                )
              if (!task.parentId)
                return (
                  <MenuItem key={task.id} value={task.id}>
                    {task.title}
                  </MenuItem>
                )
            })}
          </Select>
        </FormControl> */}
      </Box>

      {/* <Box m={1}>
        <FormControl sx={select}>
          <InputLabel htmlFor="priority">Priority</InputLabel>
          <Select
            id="priority"
            name="priority"
            value={currentTask?.priority}
            onChange={(e) => handleChange(e)}
          >
            <MenuItem value={Priority.High}>Highest Priority</MenuItem>
            <MenuItem value={Priority.Medium}>Medium Priority</MenuItem>
            <MenuItem value={Priority.Low}>Lowest Priority</MenuItem>
          </Select>
        </FormControl>
      </Box> */}

      {/* <Box m={1} sx={buttonContainer}>
        <Button
          disabled={currentTask?.title?.length === 0}
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          {task ? 'Update Task' : 'Add Task'}
        </Button>
        <Button
          disabled={currentTask?.title?.length === 0}
          variant="contained"
          color="primary"
          onClick={cancelForm}
        >
          {'Cancel'}
        </Button>
      </Box> */}
    </Grid>
  )
}

const inputContainer = {
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
}

const textField = {
  width: 400,
}

const select = {
  minWidth: 100,
}

const buttonContainer = {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '85%',
}
