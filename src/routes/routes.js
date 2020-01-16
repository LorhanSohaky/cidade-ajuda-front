import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import App from '../App'
import NovaOcorrencia from '../pages/NovaOcorrencia/NovaOcorrencia'
import paths from './paths'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path={paths.home} exact component={App} />
      <Route path={paths.incident.create} component={NovaOcorrencia} />
    </BrowserRouter>
  )
}

export default Routes
