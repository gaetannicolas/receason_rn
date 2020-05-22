import types from './types'

/**
 * Actions should always be written as pure functions even if they don't have
 * any argument, for consistency.
 *
 * If an action is not pure (ie has side-effects like fetching data) or is just dispatching
 * other actions, it should reside in the operations.js file, not here.
 *
 * Usually actions defined here are resolved in a reducer.
 */

const addLike = (recipe) => ({
  type: types.ADD_LIKE,
  recipe,
})

const removeLike = (recipe) => ({
  type: types.REMOVE_LIKE,
  recipe,
})

export default {
  addLike,
  removeLike,
}
