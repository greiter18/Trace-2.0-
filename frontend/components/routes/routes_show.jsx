import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import MainNav from './../mainNav/main_nav';
import MainFooter from '../footer/main_footer'
import { deleteRoute } from '../../util/route_api_util';


class RouteShow extends React.Component{
  constructor(props){
    super(props)
  }
  componentDidMount(){
  if(!this.props.route[this.props.match.params.routeId])
    this.props.fetchRoute(this.props.match.params.routeId)
  }
  render(){
    const {route, currentUser, deleteRoute} = this.props;
    return(
      <div>
        <MainNav/>
        <div className="routeShowAll" >
          <div className="routeShowTop">
            <div className="routeShowTitle">
            <Link to='/routes/' className="routeShowTitleLink"><h1 >My Running Routes/   </h1></Link> 
            <h1 className="routeShowTitleroute">{route.title}</h1>
            </div> 
            <div className="routeShowHeader">
              <i id='star'class="fas fa-star"></i>  
              <h1 className="routeShowHeaderTitle"> {route.title}</h1>
            </div>
            <Link to={`/routes/`}> <button className="routesShowEdit" onClick={()=> deleteRoute(route.id)}>Delete</button></Link>
            <Link to={`/routes/${route.id}/edit`} ><button className="routesShowEdit">Edit</button></Link>
          </div> 
          <div className="routesShowMain">
            {/* <img className="routeShowMap" src={route.image} /> */}
            <img className="routeShowMap" src={route.image} />
            <div id="rtShowExtra">
              <h1> <i className="icon" id='showUserIcon' className="fas fa-user-circle"></i> By {currentUser.email}</h1>
              <h1 id='rtShowDesc'>{route.description}</h1>
            </div>
          </div>
        </div>
        <MainFooter/>
      </div>
    )
  }
}

export default RouteShow
