const getActiveRouteState = (route) => {
  if (
    !route.routes
    || route.routes.length === 0
    || route.index >= route.routes.length
  ) {
    return route
  }

  const childActiveRoute = route.routes[route.index]
  return getActiveRouteState(childActiveRoute)
}

const getActiveRouteName = (navigationState) => {
  if (!navigationState) {
    return null
  }

  const route = navigationState.routes[navigationState.index]

  // Dive into nested navigators.
  if (route.routes) {
    return this.getActiveRouteName(route)
  }

  return route.routeName
}

export default {
  getActiveRouteName,
  getActiveRouteState,
}
