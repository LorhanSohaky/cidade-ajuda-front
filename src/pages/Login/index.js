import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import logo from '../../assets/logo.png'
import API from '../../services/api'

function Login () {
  const [fields, setFields] = useState({})

  const handleEvent = event => {
    setFields({ ...fields, [event.target.name]: event.target.value })
  }
  const onSubmit = event => {
    event.preventDefault()

    API.login(fields)
      .then(response => console.log(response))
      .catch(err => console.error(err))
  }

  return (
    <form style={{ display: 'flex' }} onSubmit={onSubmit}>
      <Box m={2} flex={1} display='flex' flexDirection='column'>
        <Box flex={2} display='flex' justifyContent='center'>
          <img
            src={logo}
            alt='logo'
            width='100%'
            style={{ objectFit: 'contain' }}
          />
        </Box>
        <Box
          flex={2}
          display='flex'
          flexDirection='column'
          justifyContent='space-around'
        >
          <TextField
            name='username'
            onChange={handleEvent}
            label='Usuário'
            variant='outlined'
            required
          />
          <TextField
            name='password'
            onChange={handleEvent}
            label='Senha'
            variant='outlined'
            type='password'
            autoComplete='off'
            required
          />
        </Box>
        <Box
          padding={2}
          flex={1}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Button color='primary' variant='contained' type='submit'>
            Entrar
          </Button>
        </Box>
      </Box>
    </form>
  )
}

export default Login
