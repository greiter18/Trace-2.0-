import { combineReducers } from "redux";
import users from "./users_reducer";
import workouts from "./workout_reducer";
import routes from "./route_reducer";

export default combineReducers({
  users,
  workouts,
  routes
});
