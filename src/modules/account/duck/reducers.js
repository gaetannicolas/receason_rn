import types from './types'

const initialState = {
  name: null,
}

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_NAME:
      return {
        ...state,
        name: action.name,
      }
    default:
      return state
  }
}

export default accountReducer
