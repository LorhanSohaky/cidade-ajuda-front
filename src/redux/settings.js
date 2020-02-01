import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = { coords: undefined, dimensions: undefined }

const setCoords = (state = INITIAL_STATE, { coords }) => {
  return { ...state, coords }
}

const setDimensions = (state = INITIAL_STATE, { dimensions }) => {
  return { ...state, dimensions }
}

const { Types, Creators } = createActions({
  setCoords: ['coords'],
  setDimensions: ['dimensions']
})

const HANDLERS = {
  [Types.SET_COORDS]: setCoords,
  [Types.SET_DIMENSIONS]: setDimensions
}

export const settingsReducer = createReducer(INITIAL_STATE, HANDLERS)
export const settingsTypes = Types

export default Creators
