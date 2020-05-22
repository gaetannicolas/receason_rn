import types from './types'

const initialState = {
  search: null,
}

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_RECIPE_SEARCH:
      return {
        ...state,
        search: action.product,
      }
    default:
      return state
  }
}

export default productReducer
