import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  TextField,
  Box,
  Switch,
  FormControlLabel,
  MenuItem
} from '@material-ui/core'
import { Done, ArrowBack } from '@material-ui/icons'
import openGeocoder from 'node-open-geocoder'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { compose } from 'redux'

const PromiseDecoder = ({ latitude, longitude }) => {
  return new Promise((resolve, reject) => {
    openGeocoder()
      .reverse(longitude, latitude)
      .end((err, res) => {
        if (err) {
          reject(new Error(err))
        }
        resolve(res)
      })
  })
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  leftButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

function UpsertIncident ({ history, coords }) {
  const [fields, setFields] = useState({
    transitavel_a_pe: false,
    transitavel_veiculo: false,
    descricao: '',
    tipo: 1
  })
  const [currentAddress, setCurrentAddress] = useState('')

  const goBack = () => history.push('/')

  const classes = useStyles()

  const Header = () => (
    <AppBar position='static'>
      <Toolbar>
        <IconButton
          edge='start'
          className={classes.menuButton}
          color='inherit'
          aria-label='voltar'
          onClick={() => goBack()}
        >
          <ArrowBack />
        </IconButton>
        <Typography variant='h6' className={classes.title}>
          Nova ocorrência
        </Typography>
        <IconButton
          edge='end'
          color='inherit'
          aria-label='adicionar'
          onClick={() => onSubmit()}
        >
          <Done />
        </IconButton>
      </Toolbar>
    </AppBar>
  )

  const handleEvent = event => {
    setFields({ ...fields, [event.target.name]: event.target.value })
  }

  const toggleEvent = event => {
    const currentValue = fields[event.target.name]
    setFields({ ...fields, [event.target.name]: !currentValue })
  }

  const onSubmit = event => {
    event.preventDefault()
  }

  useEffect(() => {
    if (coords) {
      PromiseDecoder(coords).then(address =>
        setCurrentAddress(address.display_name)
      )
    }
  }, [coords])

  return (
    <Box flex={1}>
      <Header goBack={goBack} />
      <Box padding={2} display='flex' flexDirection='column'>
        {currentAddress}
        <TextField
          fullWidth
          variant='outlined'
          name='tipo'
          select
          label='Tipo'
          value={fields.tipo}
          onChange={handleEvent}
          helperText='Selecione o tipo de ocorrência'
        >
          <MenuItem value='1'>Buraco</MenuItem>
        </TextField>

        <FormControlLabel
          control={
            <Switch
              name='transitavel_a_pe'
              color='primary'
              checked={fields.transitavel_a_pe}
              onChange={toggleEvent}
            />
          }
          label='Transitável a pé'
        />

        <FormControlLabel
          label='Transitável veículo'
          onChange={handleEvent}
          value={fields.transitavel_veiculo}
          control={
            <Switch
              name='transitavel_veiculo'
              color='primary'
              checked={fields.transitavel_veiculo}
              onChange={toggleEvent}
            />
          }
        />

        <TextField
          name='descricao'
          label='Descrição'
          value={fields.descricao}
          variant='outlined'
          required
          multiline
          rows='10'
          helperText='Ao detalhar bem as pessoas terão informações adicionais que podem ser essenciais'
          onChange={handleEvent}
        />
      </Box>
    </Box>
  )
}

const enhance = compose(
  withRouter,
  connect(state => ({ coords: state.settingsState.coords }), null)
)

export default enhance(UpsertIncident)
