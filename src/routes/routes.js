import React, { useContext } from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom'
import Home from '../pages/Home'
import UpsertIncident from '../pages/UpsertIncident'
import paths from './paths'
import { useSelector, useDispatch } from 'react-redux'
import settingsActions from '../redux/settings'
import { ToastContext } from '../services/ToastHandler'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthenticated = !!useSelector(state => state.userState.token)
  const dispatch = useDispatch()
  const toastContext = useContext(ToastContext)

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />
        } else {
          dispatch(settingsActions.setNavigationTab('profile'))
          toastContext.setMessage(
            'Para acessar essa funcionalidade é necessário estar logado'
          )
          toastContext.setSeverity('warning')
          toastContext.setIsOpen(true)

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
