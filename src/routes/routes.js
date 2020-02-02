import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Home from '../pages/Home'
import UpsertIncident from '../pages/UpsertIncident'
import paths from './paths'

const Routes = () => {
  return (
    <BrowserRouter>
      <Route path={paths.home} exact component={Home} />
      <Route path={paths.incident.create} component={UpsertIncident} />
    </BrowserRouter>
  )
}

export default Routes
