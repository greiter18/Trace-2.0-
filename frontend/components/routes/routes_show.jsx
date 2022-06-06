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
    }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    // this.getDistanceMatrix = new google.maps.DistanceMatrixService();
    // this.DirectionsRendererOptions = new google.maps.DirectionsRendererOptions();
    this.renderMarkers = this.renderMarkers.bind(this);
    // this.getDistance = this.getDistance.bind(this);
    
    this.startLocation = new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long);
    this.endLocation = new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long);
    this.route = '';
  }

  componentDidMount(){
    debugger
    if(!this.props.route[this.props.match.params.routeId]) {
      this.props.fetchRoute(this.props.match.params.routeId)
    debugger

    this.setState({['startLocation']: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long)});
    this.setState({['endLocation']: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long)}); }

    const options = {
      center: {lat: 40.6302923, lng: -74.1077045},
      zoom: 15,
      mapId: '2cf9dff401d20cef',
      clickableIcons: false,
      maxZoom: 15,
      disableDefaultUI: true,
    };
    this.map = new google.maps.Map(this.mapstart, options);
    this.directionsRenderer.setMap(this.map);
    this.renderMarkers();
    // this.getDistance();
  }

  componentDidUpdate(prevProps){
    if(this.props.route !== prevProps.route){
      this.renderMarkers();
    }
  }
  //-74.12145853255224
// `https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.634138457710414,-74.12145853255224&destinations=40.62475043338029,-74.13655094238051&units=imperial&travelMode=walking&
// &key=AIzaSyD-zUIawAgtQ3qXH71ektYyDm_DBo-CZGo`

  // getDistance(){
  //   let config = {
  //     method: 'get',
  //     url: `https://maps.googleapis.com/maps/api/distancematrix/json?origins=40.634138457710414,-74.12145853255224&destinations=40.62475043338029,-74.13655094238051&units=imperial&travelMode=walking&
  //   &key=AIzaSyD-zUIawAgtQ3qXH71ektYyDm_DBo-CZGo`,
  //     headers: {"Access-Control-Allow-Origin": "*"}
  //   };
  // axios(config)
  // .then(data => {
  //   console.log('Distance---------', data)}
  //   ) 
  // .catch(error => console.log('ERROR-----',error))
  // }

// getDistance(){
//  this.getDistanceMatrix.getDistanceMatrix(
//   {
//     origins:  new google.maps.LatLng(55.930385, -3.118425),
//     destinations: new google.maps.LatLng(50.087692, 14.421150),
//     travelMode: 'WALKING',
//     transitOptions: TransitOptions,
//     drivingOptions: DrivingOptions,
//     unitSystem: UnitSystem,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//   }, callback);

// function callback(response, status) {
//   console.log(response.)
// }

  renderMarkers(){
    let request = {
      origin: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long),
      destination: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long),
      travelMode: google.maps.TravelMode.WALKING,
    };
    this.directionsService.route(request, (response,status) => {
      if(status === 'OK'){
        this.directionsRenderer.setDirections(response);
        this.directionsRenderer.setOptions({polylineOptions: {strokeColor: 'orange', strokeWeight: 10}});
        this.directionsRenderer.setOptions({suppressMarkers: true});
        // this.DirectionsRendererOptions.suppressMarkers = true
        //const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
        // let starter = new google.maps.Marker({
        //   position: this.startLocation,
        //   map: map,
        //   icon: image,
        // });
        // starter();
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
         {console.log('route',this.props.route)}
        {/* {console.log('state',this.state)}
        {console.log('routeId',this.props.routeId)}
       
        {console.log('start',this.state.startLocation)}
        {console.log('end',this.state.endLocation)} */}
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
            <p>Distance: {this.props.route.distance} Miles</p>
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
