import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';
import MainNavContainer from '../mainNav/main_nav_container'
import Profile from './profile';
import Feed from './feed'
import MainFooter from '../footer/main_footer'

class Dashboard extends React.Component{ 
  constructor(props){
    super(props)
  }

  componentDidMount(){
    this.props.fetchWorkouts(this.props?.session.id)
    this.props.fetchRoutes(this.props?.session.id)
  }

  render(){
      // const workoutList = this.props.workouts !== undefined ? this.props.workouts.reverse().map((workout, i)=> {
      //   return <li className="feed" key={i}><Feed  workout={workout} email={this.props.email} route={this.props.route}/></li>
      // }) : <h1> No Workouts. Created a workout here or create your route first here </h1> 

      const workoutList = this.props?.workouts.length > 0 ?
        this.props.workouts?.reverse().map((workout, i) => {
        return (
          <li className="feed" key={i}><Feed  workout={workout} email={this.props.email} route={this.props.route}/></li>
          )
        }): <div className='emtpyfeed'>
              <h1 className='emtpyfeed-text'><section>No Workouts</section> <br /> Please Create a Workout <Link className='emptyfeed-link' to='/new/workouts'>Here</Link> or Create a Route First <Link className='emptyfeed-link' to='/new/routes'>Here</Link>
              </h1>
              <br />
              <div className='emtpyfeed-icons'>
                <i className="fas fa-person"></i>...
                <i className="fas fa-walking"></i>...
                <i className="fas fa-running"></i>...
                <i className="fas fa-biking"></i>...
              </div>
            </div> 
        ;

    return(
      <div className="main_dash">
        <MainNavContainer/>
        <br/>
        <div className="dash_profile">
          <div className="dash_profile_body">
            <Profile workouts={this.props.workouts} routeCount={this.props.routeCount} workoutCount={this.props.workoutCount} email={this.props.email}/>
          </div>
          <div className="activityFeed">
            {this.props.workouts.length ? <p id="workoutfeed">Your Activities <i className="fas fa-chevron-down"></i></p> : ''}
            <ul>{workoutList}</ul>
          </div>
          <div id="dashExtras">
            <h1 className="dashExtrasTitle">
              Challenges
            </h1>
            <p className="dashExtrasBody">
              Join a run or cycling Challenge to stay on top of your game, 
              earn new achievements and see how you stack up.
            </p>
            <i class="fa-solid fa-person-simple"></i>
            <h1 className="dashExtrasTitle">
              Clubs
            </h1>
            <p className="dashExtrasBody">
              Why do it alone? Get more out of your 
              Trace experience by joining or creating a Club.
            </p>
            <h1 className="dashExtrasTitle">
              Try a Privacy Zone
            </h1>
            <p className="dashExtrasBody">
              You can hide the location of your home, 
              office or other private places in your activities.
            </p>
          </div>
        </div>
        <MainFooter/>
      </div>
    )
  }
}

export default Dashboard;
 