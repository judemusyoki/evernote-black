import { createContext, useContext, useState } from 'react'

export type SetTask = (value: any) => void

export type TaskViewContent = {
  taskId: string | null
  setTaskId: SetTask
}
export const TaskViewContext = createContext<TaskViewContent>({
  taskId: null,
  setTaskId: () => {},
})

const TaskViewProvider = (props: { children: any }) => {
  const [taskId, setTaskId] = useState('')
  const { children } = props

  return (
    <TaskViewContext.Provider
      value={{
        taskId,
        setTaskId,
      }}
    >
      {children}
    </TaskViewContext.Provider>
  )
}

export default TaskViewProvider

export const useTaskViewContext = () => useContext(TaskViewContext)
