import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './redux'
import Routes from './routes'
import { mainTheme } from './config/theme'
import { create } from './services/api'

const App = () => {
  create({})

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={mainTheme}>
          <Routes />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
