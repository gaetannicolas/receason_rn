/* istanbul ignore file */

import { NavigationActions, StackActions } from 'react-navigation'

/**
 * This configuration allows you to use the navigation system to navigate
 * in your app outside of components automatically managed by react-navigation.
 */

let navigator

function setTopLevelNavigator(navigatorRef) {
  navigator = navigatorRef
}

function navigate(routeName, params) {
  navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function push(routeName, params) {
  navigator.dispatch(
    StackActions.push({
      routeName,
      params,
    })
  )
}

export default {
  navigate,
  push,
  setTopLevelNavigator,
}
