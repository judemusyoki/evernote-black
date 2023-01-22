import { useUser } from '@auth0/nextjs-auth0/client'

import { FC } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { AddCircleOutlineOutlined, SubjectOutlined } from '@mui/icons-material'
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material'

const drawerWidth = 240

// type MyRoute = {
//   id: number
//   text: string
//   icon: JSX.Element
//   path: string
// }

export type LayoutProps = {
  children: React.ReactNode
}

export const OverallLayout: FC<LayoutProps> = ({ children }) => {
  const router = useRouter()
  const theme = useTheme()
  const { user } = useUser()

  // TODO: Fix active menu route styling some
  // const activeRoute = (routeName: MyRoute, currentRoute: MyRoute) => {
  //   return routeName === currentRoute ? true : false
  // }

  const menuItems = [
    {
      text: 'My Notes',
      icon: <SubjectOutlined color="secondary" />,
      path: '/',
    },
    {
      text: 'Create Notes',
      icon: <AddCircleOutlineOutlined color="secondary" />,
      path: '/create',
    },
  ]

  const pageTitle: string = router.pathname === '/' ? 'Your Tasks' : 'Task Form'

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: `calc(100% - ${drawerWidth}px)`,
            ml: `${drawerWidth}px`,
          }}
        >
          <Toolbar
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6" noWrap component="div">
              {pageTitle}
            </Typography>
            <Box>
              {user ? (
                <Link href="/api/auth/logout">Logout</Link>
              ) : (
                <Link href="/api/auth/login">Login</Link>
              )}
            </Box>
          </Toolbar>
        </AppBar>

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          <Divider />
          <List>
            {menuItems.map((item) => {
              return (
                <ListItemButton
                  onClick={() => router.push(item.path)}
                  key={item.text}
                  // TODO: Add active menu item route styling
                  // className={
                  //   location.pathname === item.path ? classes.active : null
                  // }
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText
                    sx={{ fontFamily: theme.typography.fontFamily }}
                    primary={item.text}
                  />
                </ListItemButton>
              )
            })}
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{ flexGrow: 1, bgcolor: 'white', width: '30%', mt: 5 }}
        >
          <Toolbar />
          <Container sx={{ marginLeft: 0, paddingLeft: 0 }} maxWidth="xl">
            {children}
          </Container>
        </Box>
      </Box>
    </>
  )
}
