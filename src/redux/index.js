import { combineReducers, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import logger from 'redux-logger'
import { settingsReducer } from './settings'

const reducers = combineReducers({
  settingsState: settingsReducer
})

const persistConfig = {
  key: 'cidade-ajuda',
  storage
}

const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [logger]

export const store = createStore(
  persistedReducer,
  applyMiddleware(...middlewares)
)
export const persistor = persistStore(store)
