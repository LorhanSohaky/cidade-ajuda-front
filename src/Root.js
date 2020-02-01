import React from 'react'
import Routes from './routes'
import { create } from './services/api'
import { connect } from 'react-redux'
import { GeolocatedHandler } from './services/helpers'

const Root = ({ token }) => {
  create({ token })
  return (
    <>
      <Routes />
      <GeolocatedHandler />
    </>
  )
}

const mapStateToProps = state => ({
  token: state.userState.token
})

export default connect(mapStateToProps, null)(Root)
