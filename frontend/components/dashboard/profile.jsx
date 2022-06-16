import React from 'react';
import { Link } from 'react-router-dom';

const Profile = ({email,workoutCount,routeCount, workouts}) => {
  const distanceTotal = () => {
    let total = 0
    Object.values(workouts).forEach(element => {
      console.log('total each -------',element.route.distance)
      total += element.route.distance
    });
    console.log('total-----',)
    return Math.round(total * 100) / 100;
  }
  return(
    <div className="main_profile">
      
      <i id="profileUser"className="fas fa-user-circle"></i>
      <div id="profileBody">
        <h1 className="profile_email">{email}</h1>
        <br/>
        <div className="profile_totals">
          <div className='total_activities'>
            <p className="profile_category">Workouts</p>
            <Link to='/workouts' className="total_number">{workoutCount || 0}</Link>
          </div>
          <div className='total_routes'>
            <p className="profile_category">Routes</p>
            <Link to='/routes' className="total_number">{routeCount || 0 }</Link>
          </div>
        </div>
        <div className='profile-distance'>
          <p className="profile_category">Total Distance</p> 
          <p className="total_number">{distanceTotal()} mi</p> 
        </div>
      </div>
    </div>
  )
};

export default Profile;