import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = { token: undefined }

const setToken = (state = INITIAL_STATE, { token }) => {
  return { ...state, token }
}

const { Types, Creators } = createActions({
  setToken: ['token']
})

const HANDLERS = {
  [Types.SET_TOKEN]: setToken
}

export const userReducer = createReducer(INITIAL_STATE, HANDLERS)
export const userTypes = Types

export default Creators
