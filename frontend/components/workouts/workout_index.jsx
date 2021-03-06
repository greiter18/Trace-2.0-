import React from 'react';
import { deleteWorkout } from '../../util/workout_api_util';
import MainNavContainer from '../mainNav/main_nav_container';
import WorkoutIndexItem from './workout_index_item';
import MainFooter from '../footer/main_footer';
import GrayFooter from '../footer/grayFooter';

class WorkoutIndex extends React.Component{
  constructor(props){
    super(props)
    //this.latestWorkout = this.latestWorkout.bind(this);
  }

  componentDidMount(){
    this.props.fetchWorkouts(this.props.session.id)
  }

 

  render(){
    const workoutList = this.props.workouts !== undefined ? this.props.workouts.map((workout, i) => {
      return <WorkoutIndexItem workout={workout} deleteWorkout={this.props.deleteWorkout} key={i}/> 
    }) :null 

    const workoutOrworkouts = this.props.workoutCount === 1 ?
     `Workout` : 'Workouts';
  
  return (
    <div>
      <MainNavContainer/>
      <div id="workoutIdxBody">
        <div id="workoutIdxBodyTop">
          <h1 className="workoutIndexTitle">My Workouts</h1>
          <h1 className="workoutCount">{this.props.workoutCount} {workoutOrworkouts}</h1>
        </div>
        <table className="mainTable">
          <tbody>
            <tr className="tableHeader">
              <th>Sport</th>
              <th>Date</th>
              <th>Title</th>
              <th>Time</th>
              <th>Distance</th>
              <th></th>
              <th></th>
            </tr>
            {workoutList}
          </tbody>
        </table>
      </div>
      <GrayFooter/>
      <MainFooter/>
    </div>
  )
  }
}

export default WorkoutIndex;


