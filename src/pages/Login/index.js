import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import logo from '../../assets/logo.png'
import API from '../../services/api'
import settings from '../../redux/settings'

function Login ({ setToken }) {
  const [fields, setFields] = useState({})

  const handleEvent = event => {
    setFields({ ...fields, [event.target.name]: event.target.value })
  }
  const onSubmit = event => {
    event.preventDefault()

    API.login(fields)
      .then(response => {
        setToken(response.data.token)
      })
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
        <Box style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
          <TextField
            style={{ marginTop: 16 }}
            name='username'
            onChange={handleEvent}
            label='Usuário'
            variant='outlined'
            required
          />
          <TextField
            style={{ marginTop: 16 }}
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
          flex={1}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Button
            color='primary'
            variant='contained'
            type='submit'
            style={{ flex: 1 }}
          >
            Entrar
          </Button>
        </Box>
      </Box>
    </form>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setToken: settings.setToken
    },
    dispatch
  )
export default connect(mapStateToProps, mapDispatchToProps)(Login)
