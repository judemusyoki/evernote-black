import { FC } from 'react'

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
      path: '/form',
    },
  ]

  const pageTitle: string = router.pathname === '/' ? 'Your Tasks' : 'Task Form'

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            {pageTitle}
          </Typography>
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
  )
}
