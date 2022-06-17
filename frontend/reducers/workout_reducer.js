import {
  RECEIVE_WORKOUT,
  RECEIVE_ALL_WORKOUTS,
  REMOVE_WORKOUT,
  CLEAR_WORKOUTS
} from '../actions/workout_actions';

import {
    LOGOUT_CURRENT_USER,
} from '../actions/session_actions';



const workoutReducer = (state = {}, action) => {
  Object.freeze(state)
  switch (action.type) {
    case RECEIVE_WORKOUT:
      const workoutState = Object.assign({}, state);
      let id = Object.keys(action.workout)[0];
      workoutState[id] = action.workout[id];
      return workoutState;
      // return action.workout
    case RECEIVE_ALL_WORKOUTS:
      return Object.assign({}, state, action.workouts )
    case REMOVE_WORKOUT:
      const newState = Object.assign({},state, action.workouts);
      delete newState [action.workoutId];
      return newState;
    case LOGOUT_CURRENT_USER:
      return  {}
    case CLEAR_WORKOUTS:
      return  {}
    default:
      return state;
  }
}

export default workoutReducer;