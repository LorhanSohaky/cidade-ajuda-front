import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = { token: undefined }

export const setToken = (state = INITIAL_STATE, { token }) => {
  console.log('Setting token')
  return { ...state, token }
}

const { Types, Creators } = createActions({
  setToken: ['token']
})

export default Creators

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: setToken
})
