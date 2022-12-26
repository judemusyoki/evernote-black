import { Dispatch, SetStateAction } from 'react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'

import { Box, ListItemButton, ListItem } from '@mui/material'

import { Task } from '@/graphql/generated'
import { TaskItem } from './task'

type TaskListProps = {
  tasks: Task[]
  setTaskId: Dispatch<SetStateAction<string>>
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, setTaskId }) => {
  const itemCount = tasks?.length

  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props
    const currentTask = tasks[index + 1]

    const selectTask = (id: string) => {
      setTaskId(id)
    }

    if (currentTask) {
      return (
        <ListItem style={style} key={index} component="div" disablePadding>
          <ListItemButton>
            <TaskItem task={currentTask} selectTask={selectTask} />
          </ListItemButton>
        </ListItem>
      )
    } else {
      return <Box>No items listed</Box>
    }
  }

  return (
    <Box
      sx={{
        width: '100%',
        height: 400,
        maxWidth: 360,
        mt: 1,
        marginBottom: 6,
        bgcolor: 'background.paper',
        cursor: 'pointer',
      }}
    >
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={itemCount}
        overscanCount={0}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  )
}
