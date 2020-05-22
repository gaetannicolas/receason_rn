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

const setName = (name) => {
  console.log(name)
  return ({
    type: types.SET_NAME,
    name,
  })
}

export default {
  setName,
}
