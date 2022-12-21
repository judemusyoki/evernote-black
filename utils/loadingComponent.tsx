import * as React from 'react'
import Stack from '@mui/material/Stack'
import CircularProgress from '@mui/material/CircularProgress'
import { Box } from '@mui/material'

export const LoadingComponent = () => {
  return (
    <Box sx={loaderContainer}>
      <CircularProgress color="success" />
    </Box>
  )
}

const loaderContainer = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
}
