import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'
import UpsertIncident from '../pages/UpsertIncident'
import paths from './paths'
import { useSelector, useDispatch } from 'react-redux'
import settingsActions from '../redux/settings'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!useSelector(state => state.userState.token)
  const dispatch = useDispatch()

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          dispatch(settingsActions.setNavigationTab('profile'))
          return (
            <Route
              {...rest}
              render={props => (
                <Redirect
                  to={{ pathname: paths.home, state: { from: props.location } }}
                />
              )}
            />
          )
        }
      }}
    />
  )
}

const Routes = ({ isAuthenticated }) => {
  return (
    <BrowserRouter>
      <Route path={paths.home} exact component={Home} />
      <PrivateRoute
        path={paths.incident.create}
        component={UpsertIncident}
        isAuthenticated={isAuthenticated}
      />
    </BrowserRouter>
  )
}

export default Routes
