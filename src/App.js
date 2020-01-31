import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { ThemeProvider } from '@material-ui/styles'

import Routes from './routes'
import { mainTheme } from './config/theme'
import { reducers } from './redux'
import { create } from './services/api'
import logger from 'redux-logger'

const store = createStore(reducers, applyMiddleware(logger))

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
