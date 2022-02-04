import React from 'react'
import { Link } from 'react-router-dom';
import MainNav from '../mainNav/main_nav'

class WorkoutShow extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){
  if(!this.props.workout[this.props.match.params.workoutId])
    this.props.fetchWorkout(this.props.match.params.workoutId)
  }

  render(){
    const {workout, route, currentUser} = this.props;

    let newHour = workout.hours < 10 ? 
      `0${workout.hours}` : workout.hours
    let newMin = workout.minutes < 10 ? 
      `0${workout.minutes}` : workout.minutes
    let newSec = workout.seconds < 10 ? 
      `0${workout.seconds}`: workout.seconds

    return(
      <div>
        <MainNav/>
        <div id='workoutShow'>
          <body id="workShowBody">
            <div id="workShowhead">
              <h1>{route.email} - {workout.run_type} </h1>
            </div>
            <div className="workShowMain">
              <div className="workShowMainLeft">
                <i id="userWorkShow" className="fas fa-user-circle"></i>
                <div className="workShowMainLeft-inner">
                  <h1 id='workShowTitle'> {workout.title}</h1>
                  <h1>{workout.description}</h1>
                </div>
              </div>
              <div className="workShowitem">
                <h1>{workout.date}</h1>
                <h2>Date</h2>
              </div>
              <div className="workShowitem">
                <h1>{newHour}:{newMin}:{newSec}</h1>
                <h2>Moving Time</h2>
              </div>
              <div className="workShowitem">
              <h1>{route?.title}</h1>
              <h2>Run Name</h2>
              </div>
            </div>
          </body>
          <div id='mapContainer'>
          <img id="workShowMap" src={route?.image}  alt='route image'/>
          </div>
        </div> 
      </div>
    )
  }
}

export default WorkoutShow