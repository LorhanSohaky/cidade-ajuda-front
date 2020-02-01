import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'

import Routes from './routes'
import { mainTheme } from './config/theme'
import store from './redux'
import { create } from './services/api'

const App = () => {
  create({})

  return (
    <Provider store={store}>
      <ThemeProvider theme={mainTheme}>
        <Routes />
      </ThemeProvider>
    </Provider>
  )
}

export default App
