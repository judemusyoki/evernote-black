import { gql, useQuery } from '@apollo/client'
import type { Task } from '@prisma/client'

import { Typography } from '@mui/material'

const AllTasksQuery = gql`
  query {
    tasks {
      id
      title
      subtitle
      notes
      completed
      createdAt
      updatedAt
      authorId
    }
  }
`

export default function ShowTasks() {
  const { data, loading, error } = useQuery(AllTasksQuery)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Oh no... {error.message}</p>

  const { tasks } = data

  return tasks.map((task: Task) => {
    return (
      <>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="subtitle1">{task.subtitle}</Typography>
        <Typography variant="body2">{task.notes}</Typography>
      </>
    )
  })
}

// authorId
// 589578dd-150a-429f-907e-555ad070f924
