import { ApolloProvider } from '@apollo/client'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { CacheProvider, EmotionCache } from '@emotion/react'
import { Provider as UrqlProvider } from 'urql'

import { FC, ReactElement, ReactNode } from 'react'

import { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { ThemeProvider, CssBaseline } from '@mui/material'

import { OverallLayout } from '@/components/layout'
import { client } from '@/lib/graphql'
import '@/styles/globals.css'
import lightTheme from '@/styles/theme/lightTheme'
import createEmotionCache from '@/utils/createEmotionCache'

import apolloClient from '../lib/apollo'

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
      <UserProvider>
        <ApolloProvider client={apolloClient}>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              {getLayout(<Component {...pageProps} />)}
            </ThemeProvider>
          </CacheProvider>
        </ApolloProvider>
      </UserProvider>
    </UrqlProvider>
  )
}

export default App
