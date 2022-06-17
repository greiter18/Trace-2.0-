import {connect} from 'react-redux';
import { fetchWorkout, deleteWorkout  } from '../../actions/workout_actions';
import WorkoutShow from './workout_show'

const mstp = (store, ownProps) => {
  const workoutId = ownProps.match.params.workoutId
  return {
    workout: store.entities.workouts[workoutId] || {},
    route: store.entities.workouts[workoutId]?.route|| {},
  }
}

const mdtp = dispatch => {
  return ({
    fetchWorkout: workoutId => dispatch(fetchWorkout(workoutId)),
    deleteWorkout: workoutId => dispatch(deleteWorkout(workoutId))
  })
}

export default connect(mstp, mdtp)(WorkoutShow)