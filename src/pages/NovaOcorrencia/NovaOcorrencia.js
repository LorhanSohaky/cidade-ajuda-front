import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Done from '@material-ui/icons/Done'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}))

export default function NovaOcorrencia ({ history }) {
  const classes = useStyles()

  function handleBackMaps () {
    history.push('/')
  }

  function save () {}

  return (
    <div className={classes.root}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='voltar'
            onClick={handleBackMaps}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            Nova ocorrência
          </Typography>
          <IconButton
            edge='end'
            color='inherit'
            aria-label='voltar'
            onClick={save}
          >
            <Done />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  )
}
