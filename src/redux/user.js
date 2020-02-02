import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = { token: undefined }

const setToken = (state = INITIAL_STATE, { token }) => {
  return { ...state, token }
}

const setMe = (state = INITIAL_STATE, { me }) => {
  return { ...state, me }
}

const { Types, Creators } = createActions({
  setMe: ['me'],
  setToken: ['token']
})

const HANDLERS = {
  [Types.SET_ME]: setMe,
  [Types.SET_TOKEN]: setToken
}

export const userReducer = createReducer(INITIAL_STATE, HANDLERS)
export const userTypes = Types

export default Creators
