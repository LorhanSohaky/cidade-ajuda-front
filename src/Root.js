import React, { createContext, useState, useEffect } from 'react'
import Routes from './routes'
import API, { create } from './services/api'
import { connect } from 'react-redux'
import { GeolocatedHandler, DimensionsListener } from './services/helpers'

export const AppContext = createContext()

const Root = ({ token }) => {
  create({ token })

  const [types, setTypes] = useState([])

  useEffect(() => {
    API.getTypes().then(({ data }) => {
      /* eslint-disable camelcase */
      const transformatedData = data.results.reduce(
        (obj, { id, titulo, sugestao_descricao }) => {
          obj[id] = { id, titulo, sugestao_descricao }
          return obj
        },
        {}
      )
      /* eslint-enable camelcase */
      setTypes(transformatedData)
    })
  }, [])
  return (
    <AppContext.Provider value={{ types }}>
      <Routes />
      <GeolocatedHandler />
      <DimensionsListener />
    </AppContext.Provider>
  )
}

const mapStateToProps = state => ({
  token: state.userState.token
})

export default connect(mapStateToProps, null)(Root)
