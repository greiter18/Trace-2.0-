import {
  RECEIVE_ROUTE,
  RECEIVE_ALL_ROUTES,
  REMOVE_ROUTE,
  CLEAR_ROUTES
} from '../actions/routes_action';

import {
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';



const routeReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_ROUTE:
      const routeState = Object.assign({}, state);
      let id = Object.keys(action.route)[0] // 107
      routeState[id] = action.route[id];
      return routeState;
      // return action.route
    case RECEIVE_ALL_ROUTES:
      return Object.assign({}, state, action.routes)
    case REMOVE_ROUTE:
      let newState = Object.assign({}, state, action.routes);
      delete newState[action.routeId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return {}
    case CLEAR_ROUTES:
      return {}
    default:
      return state;
  }
}

export default routeReducer;