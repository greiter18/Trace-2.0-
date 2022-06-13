import React from 'react'
import { Link, withRouter } from 'react-router-dom';
import MainNav from './../mainNav/main_nav';
import MainFooter from '../footer/main_footer'
import axios from 'axios';

class RouteShow extends React.Component{
  constructor(props){
    super(props)
    this.state = {
    startLocation: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long),
    endLocation: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long)
    };
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.startLocation = new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long);
    this.endLocation = new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long);
    this.route = '';
    this.convertDate = this.convertDate.bind(this);
  }

  componentDidMount(){
    if(!this.props.route[this.props.match.params.routeId]) {
      this.props.fetchRoute(this.props.match.params.routeId);
      this.setState({['startLocation']: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long)});
      this.setState({['endLocation']: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long)}); 
    };
//=================    
//creating the map
//=================
    const options = {
      center: {lat: 40.6302923, lng: -74.1077045},
      zoom: 14,
      mapId: '2cf9dff401d20cef',
      clickableIcons: false,
      maxZoom: 15,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(this.mapstart, options);
    this.directionsRenderer.setMap(this.map);
    this.renderMarkers();
  }

  componentDidUpdate(prevProps){            // takes prevProps and prevState
    if(this.props.route !== prevProps.route){
      this.renderMarkers();
    }
  }
//===========================================================================================
//creating of the map and using the route prop's details to draw out the polyline of the map
//===========================================================================================
  renderMarkers(){
    let request = {
      origin: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long),
      destination: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long),
      travelMode: google.maps.TravelMode.WALKING,
    };
    this.directionsService.route(request, (response,status) => {
      if(status === 'OK'){
        this.directionsRenderer.setDirections(response);
        this.directionsRenderer.setOptions({polylineOptions: {strokeColor: 'red', strokeWeight: 5}});
        this.directionsRenderer.setOptions({suppressMarkers: true});
      } else {
        console.log('Directions request failed due to ', status)
      }
    })
  };
//=============================================
//Converts the date to an easy to read format
//=============================================
  convertDate(date){
    const months = {
      '01': 'January', '02': 'February', '03': 'March', '04': 'April', '05' : 'May', '06': 'June', '07': 'July', '08': 'August', '09': 'September', '10': 'October', '11': 'November', '12': 'December' 
    };

    let newDate = '';
    for(let i = 0; i < date.length; i++){
      let char = date[i];
      if(char === 'T'){
        break
      } else {
        newDate += char;
      }
    };
    let month = newDate.slice(5,7)
    let newMonth = months[month]
    let year = newDate.slice(0,4)
    let day = newDate.slice(8) // 08
    return (newMonth +' '+ day + ', ' + year);
  }

  
  render(){
    const {route, currentUser, deleteRoute} = this.props;

    return(
      <div>
        <MainNav/>
         {console.log('created at',this.props.route.created_at)}
        <div className="routeShowAll" >
          <div className="routeShowTop">
            <div className="routeShowTitle">
            <Link to='/routes/' className="routeShowTitleLink"><h1 >My Running Routes/   </h1></Link> 
            <h1 className="routeShowTitleroute">{route.title}</h1>
            </div> 
            <div className="routeShowHeader">
              <i id='star'className="fas fa-star"></i>  
              <h1 className="routeShowHeaderTitle"> {route.title}</h1>
            </div>
            <Link to={`/routes/`}> <button className="routesShowEdit" onClick={()=> deleteRoute(route.id)}>Delete</button></Link>
            <Link to={`/routes/${route.id}/edit`}><button className="routesShowEdit">Edit</button></Link>
          </div> 
          <div className="routesShowMain">
            <div id='map' className="routeShowMap" ref={(map) => (this.mapstart = map)}></div>
            <div className="rtShowExtra">
              <div className='rtShowExtra-main'>
                <i className="icon fas fa-user-circle" id='showUserIcon'></i>
                <div className='rtShowExtra-main-top'>
                  <h1> By {currentUser.email}</h1>
                  <h1 className='rtShowExtra-main-created'>Created on {this.convertDate(this.props.route.created_at || 0)}</h1>
                </div> 
              </div>
              <div className='rtShowExtra-main-mid'>
                <p className='rtShowDistance'>{route.distance}mi</p>
                <p className='rtShowDistanceLower'>Distance</p> 
              </div>
              <div className='rtShowExtra-main-bot'>
                <p className='rtShowDesc'>{route.description}</p>
              </div>
            </div>
          </div>
        </div>
        <MainFooter/>
      </div>
    )
  }
}

export default RouteShow
