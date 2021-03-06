import React from 'react'
import { Link, withRouter } from 'react-router-dom';

const MainNav = ({logout}) => {

  return (
    <div className="main_nav_head"> 
      <div className="nav-left">
        <Link className='nav_main_logo' to="/dashboard"> TRACE </Link>
        <div className="dropdown" id="dashboardDropdown">
          <button className="dropbtn">Dashboard  <i className="fa fa-chevron-down" aria-hidden="true"> </i></button>
          <div className="dropdown_content">
            <Link to="/dashboard">Activity Feed</Link>
            <Link to="/workouts">My Workouts</Link>
            <Link to="/routes">My Routes</Link>
          </div>
        </div>
      </div>
      <div className="nav-right">
        <div className="dropdown" >
          <button className="dropbtn"><i id="navUser"className="far fa-user-circle"></i> <i className="fa fa-chevron-down" aria-hidden="true"></i></button>
          <div className="dropdown_content" id="create_dropdown">
            <a onClick={logout}>Log Out</a>
          </div>
        </div>
        <div className="dropdown">
          <button className="dropbtn"><i id="navCross" className="fas fa-plus-circle"></i></button>
          <div className="dropdown_content" id="create_dropdown">
            <Link to='/new/routes'> <i className="fas fa-angle-up"></i>  Create Route</Link>
            <Link to='/new/workouts'><i className="fas fa-arrow-circle-up"></i>  Create Workout</Link>
          </div>
        </div>  
      </div>
    </div>
  )
}

export default MainNav;

