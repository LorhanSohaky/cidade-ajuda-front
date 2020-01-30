import React from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import logo from '../../assets/logo.png'

function Login () {
  return (
    <form style={{ display: 'flex' }}>
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
          <TextField label='Usuário' variant='outlined' required />
          <TextField
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
