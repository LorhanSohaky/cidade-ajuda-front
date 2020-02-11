import React, { useState } from 'react'
import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

export const ToastContext = React.createContext()

export default function ToastHandler ({ children }) {
  const [isOpen, setIsOpen] = useState(true)
  const [severity, setSeverity] = useState('warning')
  const [message, setMessage] = useState('')

  const contextValue = { setIsOpen, setSeverity, setMessage }

  return (
    <>
      <ToastContext.Provider value={contextValue}>
        {children}
      </ToastContext.Provider>
      <Snackbar
        open={isOpen}
        autoHideDuration={3000}
        onClose={() => {
          setIsOpen(false)
        }}
      >
        <Alert elevation={6} variant='filled' severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </>
  )
}
