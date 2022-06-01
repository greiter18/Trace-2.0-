import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import MainNav from './../mainNav/main_nav';
import MainFooter from '../footer/main_footer'
import { deleteRoute } from '../../util/route_api_util';


class RouteShow extends React.Component{
  constructor(props){
    super(props)
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.startLocation = new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long);
    this.endLocation = new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long) 
  }
  componentDidMount(){
  if(!this.props.route[this.props.match.params.routeId])
    this.props.fetchRoute(this.props.match.params.routeId)
  }

  componentDidMount(){
    const options = {
      center: {lat: 40.6302923, lng: -74.1077045},
      zoom: 15,
      mapId: '2cf9dff401d20cef',
      clickableIcons: false,
      maxZoom: 15
    };
    this.map = new google.maps.Map(this.mapstart, options)
    this.directionsRenderer.setMap(this.map)
    // this.directionsRenderer.setMap(this.map)
    this.renderMarkers()
  }

  renderMarkers(){
    let request = {
      origin: this.startLocation,
      destination: this.endLocation,
      travelMode: google.maps.TravelMode.WALKING,
    };
    this.directionsService.route(request, (response,status) => {
      if(status === 'OK'){
        this.directionsRenderer.setDirections(response)
      } else {
        console.log('Directions request failed due to ', status)
      }
    })
  };

  
  render(){
    const {route, currentUser, deleteRoute} = this.props;

    return(
      <div>
        <MainNav/>
        {console.log(this.props.route)}
        {console.log('start',this.startLocation)}
        {console.log('end',this.endLocation)}
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
             {/* <div id='map' ref={(map) => (mapstart = map)}></div> */}
            {/* <img className="routeShowMap" src={route.image} /> */}
            <div id='map' className="routeShowMap" ref={(map) => (this.mapstart = map)}></div>
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
