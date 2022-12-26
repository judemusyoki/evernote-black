import '@/styles/globals.css'
import { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Provider as UrqlProvider } from 'urql'
import TaskViewProvider from '@/context/index'

import { client } from '@/lib/graphql'

import { ThemeProvider, CssBaseline } from '@mui/material'

import createEmotionCache from '@/utils/createEmotionCache'
import lightTheme from '@/styles/theme/lightTheme'

import { FC, ReactElement, ReactNode } from 'react'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { OverallLayout } from '@/components/layout/MainNav'

const clientSideEmotionCache = createEmotionCache()

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}
interface MyAppProps extends AppProps {
  Component: NextPageWithLayout
  emotionCache?: EmotionCache
}

const App: FC<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const getLayout =
    Component.getLayout ?? ((page) => <OverallLayout>{page}</OverallLayout>)

  return (
    <UrqlProvider value={client}>
      <TaskViewProvider>
        <CacheProvider value={emotionCache}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />
            {getLayout(<Component {...pageProps} />)}
          </ThemeProvider>
        </CacheProvider>
      </TaskViewProvider>
    </UrqlProvider>
  )
}

export default App
