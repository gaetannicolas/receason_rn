import types from './types'

const initialState = {
  recipes: {},
}

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_LIKE:
      if (!state.recipes[action.recipe.title]) {
        const newState = { recipes: { ...state.recipes } }
        newState.recipes[action.recipe.title] = {
          ...action.recipe,
        }

        return newState
      }
      return state

    case types.REMOVE_LIKE:
      if (state.recipes[action.recipe.title]) {
        const newState = { recipes: { ...state.recipes } }
        delete newState.recipes[action.recipe.title]
        return newState
      }
      return state

    default:
      return state
  }
}

export default recipeReducer
