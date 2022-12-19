import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'

import { client } from '../lib/graphql'

import { ThemeProvider, CssBaseline } from '@mui/material'

import createEmotionCache from '../utils/createEmotionCache'
import lightTheme from '../styles/theme/lightTheme'
import '../styles/globals.css'

import { FC, useState } from 'react'
import setTheme from '../styles/theme/lightTheme'
import { useMediaQuery } from '@mui/material'
import { CacheProvider, EmotionCache } from '@emotion/react'

const clientSideEmotionCache = createEmotionCache()

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache
}

const App: FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  return (
    <UrqlProvider value={client}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </CacheProvider>
    </UrqlProvider>
  )
}

export default App
