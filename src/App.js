import React from 'react'
import { Provider } from 'react-redux'
import { ThemeProvider } from '@material-ui/styles'
import { PersistGate } from 'redux-persist/integration/react'

import { persistor, store } from './redux'
import { mainTheme } from './config/theme'
import Root from './Root'
import ToastHandler from './services/ToastHandler'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={mainTheme}>
          <ToastHandler>
            <Root />
          </ToastHandler>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
