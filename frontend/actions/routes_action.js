import * as RoutesApiUtil from '../util/route_api_util';

export const RECEIVE_ROUTE = 'RECEIVE_ROUTE';
export const RECEIVE_ALL_ROUTES = 'RECEIVE_ALL_ROUTES';
export const REMOVE_ROUTE = 'REMOVE_ROUTE';
export const CLEAR_ROUTES = 'CLEAR_ROUTES';


export const receiveRoute = route => {
  return {
    type: RECEIVE_ROUTE,
    route
  }
}
export const receiveRoutes = routes => {
  return {
    type: RECEIVE_ALL_ROUTES,
    routes
  }
}
export const removeRoute = routeId => {
  // debugger
  return {
    type: REMOVE_ROUTE,
    routeId
  }
}

export const clearRoutes = () => {
	return {
		type: CLEAR_ROUTES,
	};
};

export const fetchRoute = (routeId) => {
  return dispatch => {
    return RoutesApiUtil.fetchRoute(routeId)
      .then(route => {
        dispatch(receiveRoute(route))
      })
  }
}
export const fetchRoutes = (user_id) => {
  // debugger
  return dispatch => {
    return RoutesApiUtil.fetchRoutes(user_id)
      .then(routes => {
        dispatch(receiveRoutes(routes))
      })
  }
}
export const createRoute = (route) => {
  return dispatch => {
    return RoutesApiUtil.createRoute(route)
      .then(newRoute => {
        dispatch(receiveRoute(newRoute))
      })
  }
}
export const updateRoute = (route) => {
  return dispatch => {
    return RoutesApiUtil.updateRoute(route)
      .then(upRoute => {
        dispatch(receiveRoute(upRoute))
      })
  }
}
export const deleteRoute = (routeId) => {
  // debugger
  return dispatch => {
    return RoutesApiUtil.deleteRoute(routeId)
      .then(() => {
        // debugger
        dispatch(removeRoute(routeId))
      })
  }
}