import React, { useState } from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import logo from '../../assets/logo.png'
import API from '../../services/api'
import userActions from '../../redux/user'

function Login ({ setToken, setMe }) {
  const [fields, setFields] = useState({})

  const handleEvent = event => {
    setFields({ ...fields, [event.target.name]: event.target.value })
  }
  const onSubmit = event => {
    event.preventDefault()

    API.login(fields)
      .then(response => {
        setToken(response.data.token)
        return API.getMe()
      })
      .then(response => {
        setMe(response.data)
      })
      .catch(err => console.error(err))
  }

  return (
    <form
      style={{ display: 'flex', flex: 1, justifyContent: 'center' }}
      onSubmit={onSubmit}
    >
      <Box m={2} flex={1} display='flex' flexDirection='column' maxWidth={768}>
        <Box flex={2} display='flex' justifyContent='center'>
          <img
            src={logo}
            alt='logo'
            width='100%'
            style={{ objectFit: 'contain', maxWidth: 500 }}
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

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setMe: userActions.setMe,
      setToken: userActions.setToken
    },
    dispatch
  )
export default connect(null, mapDispatchToProps)(Login)
