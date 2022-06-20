import React from 'react';
import { Link, Route } from 'react-router-dom';


const Feed = ({workout, email, route}) => {
  return (
    <div className="feedCard">
      <div className="feedCardTop">
        <div className="feedCardTop-icons">
          <i className="runnerIcon fas fa-user-circle"></i>
          <i className="personRunning fas fa-running"></i>
        </div>
        <div className='feedCard-data'>
          <div className="feedCardTop-data">
            <p className="feedEmail"> {email}</p>
            <p className='feedDate'>{workout.date}</p>
          </div> 
          <div className='feedCard-lowerHalf'>
            <div className="feedCardMid"> 
              <Link to={`/workouts/${workout.id}`} className="feedTitle"> {workout?.title}</Link>
              <div className="feedDescription">
                <p> {workout?.description}</p>
              </div>
            </div>
            <div className="feedCardLow">
              <div className='feedDistance'>
                <p className='feed-mid-details-top'>Distance</p>
                <p className='feed-mid-details-top-low'>{workout.route.distance} mi</p>
              </div>
              <div className='feedTime'>
                <p className='feed-mid-details-top'>Time</p>
                <p className='feed-mid-details-top-low'> {workout?.hours}h {workout?.minutes}m {workout?.seconds}s</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/workouts/${workout.id}`} ><img className="routefeedImage" 
          src={route[workout?.route_id]?.image} alt="route image"/>
      </Link> 
    </div>
  )
}

export default Feed;