import React from 'react'

import { useRouter } from 'next/router'

import { TaskForm } from '@/components/form'
import { Task } from '@/graphql/generated'
import { useTasks } from '@/lib/index'
import { LoadingComponent } from '@/utils/loadingComponent'

export default function Create() {
  const router = useRouter()
  const { fetching: loading, tasks } = useTasks()

  const handleCancel = () => {
    router.push('/')
  }

  if (!tasks || loading) return <LoadingComponent />

  const taskId = router.query.taskId as string
  const updateTask = tasks.find((task: Task) => task.id === taskId)

  return <TaskForm task={updateTask} onCancel={handleCancel} />
}
