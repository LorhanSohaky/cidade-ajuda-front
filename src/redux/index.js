import { combineReducers, createStore, applyMiddleware } from 'redux'
import { settingsReducer } from './settings'
import logger from 'redux-logger'

const reducers = combineReducers({
  settingsState: settingsReducer
})

const middlewares = [logger]

const store = createStore(reducers, applyMiddleware(...middlewares))
export default store
