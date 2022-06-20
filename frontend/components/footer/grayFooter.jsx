import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { fetchWorkouts } from '../../actions/workout_actions';
import {Link} from 'react-router-dom';

 const grayFooter = ({fetchWorkouts, workouts, session}) => {
  
  useEffect(()=> {
    fetchWorkouts(session.id)
  }, [])


  let workout = workouts.reverse()[0];
  return (
    <div className='gray_footer-main'>
      <div>
        <h1>Your Recent Activities</h1>
        <i className="fas fa-running"></i> <Link to={`/workouts/${workout?.id}`} className='gray_footer-link'>{workout?.title}</Link>
      </div>
      <div className='gray_footer-blog'>
        <h1>Trace Blog</h1> 
        <p className='gray_footer-blog-body'>Read our blog - adventure stories, training tips and <br/> insights from the community.</p>
        <p>Read our blog</p>
      </div>
    </div>
  )
};

const mstp = (store) => {
  return {
    session: store.session,
    workouts: Object.values(store.entities.workouts)
  }
}

const mdtp = dispatch => {
  return {
    fetchWorkouts: (id) => dispatch(fetchWorkouts(id))
  }
}

export default connect(mstp,mdtp)(grayFooter)

