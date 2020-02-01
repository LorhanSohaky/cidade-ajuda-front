import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = { coords: undefined }

const setCoords = (state = INITIAL_STATE, { coords }) => {
  return { ...state, coords }
}

const { Types, Creators } = createActions({
  setCoords: ['coords']
})

const HANDLERS = {
  [Types.SET_COORDS]: setCoords
}

export const settingsReducer = createReducer(INITIAL_STATE, HANDLERS)
export const settingsTypes = Types

export default Creators
