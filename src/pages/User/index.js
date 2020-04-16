import React from 'react'
import { Box, TextField, Button } from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'

import userActions from '../../redux/user'

function User () {
  const user = useSelector(state => state.userState.me)
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(userActions.setMe(undefined))
  }

  if (!user) {
    return null
  }

  return (
    <Box m={2} flex={1} display='flex' flexDirection='column' maxWidth={768}>
      <TextField
        style={{ marginTop: 16 }}
        label='Nome completo'
        value={`${user.primeiro_nome} ${user.sobrenome}`}
        variant='outlined'
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        style={{ marginTop: 16 }}
        label='Apelido'
        value={user.apelido}
        variant='outlined'
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        style={{ marginTop: 16 }}
        label='E-mail'
        value={user.email}
        variant='outlined'
        InputProps={{
          readOnly: true
        }}
      />
      <TextField
        style={{ marginTop: 16 }}
        label='Data de nascimento'
        value={user.data_nascimento}
        variant='outlined'
        InputProps={{
          readOnly: true
        }}
      />
      <Box flex={1} display='flex' alignItems='center' justifyContent='center'>
        <Button
          color='primary'
          variant='contained'
          style={{ flex: 1 }}
          onClick={handleClick}
        >
          Sair
        </Button>
      </Box>
    </Box>
  )
}

export default User
