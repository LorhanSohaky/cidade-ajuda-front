import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core'
import { Done, ArrowBack } from '@material-ui/icons'

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
