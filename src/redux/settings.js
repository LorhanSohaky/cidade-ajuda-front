import { createActions, createReducer } from 'reduxsauce'

const INITIAL_STATE = { coords: undefined, dimensions: undefined, tab: 'map' }

const setCoords = (state = INITIAL_STATE, { coords }) => {
  return { ...state, coords }
}

const setDimensions = (state = INITIAL_STATE, { dimensions }) => {
  return { ...state, dimensions }
}

const setNavigationTab = (state = INITIAL_STATE, { tab }) => {
  return { ...state, tab }
}

const { Types, Creators } = createActions({
  setNavigationTab: ['tab'],
  setCoords: ['coords'],
  setDimensions: ['dimensions']
})

const HANDLERS = {
  [Types.SET_NAVIGATION_TAB]: setNavigationTab,
  [Types.SET_COORDS]: setCoords,
  [Types.SET_DIMENSIONS]: setDimensions
}

export const settingsReducer = createReducer(INITIAL_STATE, HANDLERS)
export const settingsTypes = Types

export default Creators
