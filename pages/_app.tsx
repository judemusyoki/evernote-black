import { CacheProvider, EmotionCache } from '@emotion/react'
import { Hydrate, QueryClientProvider } from '@tanstack/react-query'
import { Provider as UrqlProvider } from 'urql'

import { FC, ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

import { ThemeProvider, CssBaseline } from '@mui/material'

import { OverallLayout } from '@/components/layout/MainNav'
import TaskViewProvider from '@/context/index'
import { client } from '@/lib/graphql'
import { queryClient } from '@/lib/reactQueryConfig'
import '@/styles/globals.css'
import lightTheme from '@/styles/theme/lightTheme'
import createEmotionCache from '@/utils/createEmotionCache'

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
    <SessionProvider session={pageProps.session}>
      <UrqlProvider value={client}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <TaskViewProvider>
              <CacheProvider value={emotionCache}>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline />
                  {getLayout(<Component {...pageProps} />)}
                </ThemeProvider>
              </CacheProvider>
            </TaskViewProvider>
          </Hydrate>
        </QueryClientProvider>
      </UrqlProvider>
    </SessionProvider>
  )
}

export default App
