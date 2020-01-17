import React from 'react'
import Routes from './routes'

import { ThemeProvider } from '@material-ui/styles'

import { mainTheme } from './config/theme'

const App = () => {
  return (
    <ThemeProvider theme={mainTheme}>
      <Routes />
    </ThemeProvider>
  )
}

export default App
