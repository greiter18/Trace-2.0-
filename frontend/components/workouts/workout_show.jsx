import React from 'react'
import { Link } from 'react-router-dom';
import MainNav from '../mainNav/main_nav'
import MainFooter from '../footer/main_footer';
import GrayFooter from '../footer/grayFooter';

class WorkoutShow extends React.Component{
  constructor(props){
    super(props) 
    this.state = {
    startLocation: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long),
    endLocation: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long)
    }
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.startLocation = new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long);
    this.endLocation = new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long);
    this.route = '';
  }

  componentDidMount(){
  if(!this.props.workout[this.props.match.params.workoutId])
    this.props.fetchWorkout(this.props.match.params.workoutId)

    this.setState({['startLocation']: new google.maps.LatLng(this.props.route.start_lat, this.props.route.start_long)});
    this.setState({['endLocation']: new google.maps.LatLng(this.props.route.end_lat, this.props.route.end_long)}); 
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
  }

  componentDidUpdate(prevProps){
    if(this.props.route !== prevProps.route){
      this.renderMarkers();
    }
  }

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
        <div className='workoutShow-whole'>
          <div id='workoutShow'>
            <body id="workShowBody">
              <div id="workShowhead">
                <i class="fas fa-caret-square-right"></i>
                <h1> {route.email} - {workout.run_type} </h1>
              </div>
              <div className="workShowMain">
                <div className="workShowMainLeft">
                  <i id="userWorkShow" className="fas fa-user-circle"></i>
                  <div className="workShowMainLeft-inner">
                    <h1 id='workShowTitle'> {workout.title}</h1>
                    <h1>{workout.description}</h1>
                  </div>
                </div>
                <div className="workShowMainRight">
                  <div className="workShowMainRight-top">
                    <div className="workShowitem">
                      <p className='wrkOutShow-item-top'>{workout.date}</p>
                      <p className='wrkOutShow-item-low'>Date</p>
                    </div>
                    <div className="workShow-MovingTime">
                      <p className='wrkOutShow-item-top'>{newHour}:{newMin}:{newSec}</p>
                      <p className='wrkOutShow-item-low'>Moving Time</p>
                    </div>
                    <div className='wrkOutShow-distance'>
                      <p className='wrkOutShow-distance-top wrkOutShow-item-top'>{route.distance}mi</p>
                      <p className='wrkOutShow-distance-lower wrkOutShow-item-low'>Distance</p> 
                    </div>
                  </div>
                  {/* <div className="wrkOutShow-route-title">
                    <p>{route?.title}</p>
                    <p>Run Name</p>
                  </div> */}
                </div>
              </div>  
            </body>
            <div id='mapContainer'>
            {/* <img id="workShowMap" src={route?.image}  alt='route image'/> */}
              <div id='map' className="wrkOutShow-Map" ref={(map) => (this.mapstart = map)}></div>
            </div>
          </div>
        </div> 
        <GrayFooter/>
        <MainFooter/>
      </div>
    )
  }
}

export default WorkoutShow