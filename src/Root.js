import React from 'react'
import Routes from './routes'
import { create } from './services/api'
import { connect } from 'react-redux'

const Root = ({ token }) => {
  create({ token })
  return <Routes />
}

const mapStateToProps = state => ({
  token: state.settingsState.token
})

export default connect(mapStateToProps, null)(Root)
