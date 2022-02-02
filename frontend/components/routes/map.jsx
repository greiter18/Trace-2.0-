import React from 'react';
import ReactDOM from 'react-dom';
import MapModal from './map_modal';
import RouteNav from './routes_nav';
import MainFooter from '../footer/main_footer'


class Maps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showh1: false,
      title: this.props?.route?.title,
      description: this.props?.route?.description,
      disabled: true,
      location: '',
      address: '',
      image: '',
      marks: 
      this.props.formType === "Edit Route" ?
      [{lat: this.props.route.start_lat,
        lng: this.props.route.start_long
      },{lat: this.props.route.end_lat,
       lng: this.props.route.end_long
      }] :[]
    }
    this.points = this.state?.marks;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.geocoder = new google.maps.Geocoder();
    this.renderMarkers = this.renderMarkers.bind(this);
    this.removeLastPoint = this.removeLastPoint.bind(this);
    this.removeAllPoints = this.removeAllPoints.bind(this);
    this.id = this.props?.session?.id;
    this.openModal = this.openModal.bind(this);
    this.searchAddress = this.searchAddress.bind(this);
    this.update = this.update.bind(this);
    this.getThumbnail = this.getThumbnail.bind(this);
    this.startLat = this?.points[0]?.lat
    this.startLng = this?.points[0]?.lng
    this.endLat = this?.points[1]?.lat
    this.endLang = this?.points[1]?.lng
  }

  componentDidMount(){
    const options = {
      center: {lat: 40.6302923, lng: -74.1077045},
      zoom: 15,
      mapId: '2cf9dff401d20cef',
      clickableIcons: false,
      maxZoom: 15
    };
    this.map = new google.maps.Map(this.mapstart, options);
    this.directionsRenderer.setMap(this.map)
    this.map.addListener("click", (e) => {
      if(this.points.length > 1) this.points.pop()
			this.points.push({ lat: e.latLng.lat(), lng: e.latLng.lng() });
      this.toggleDisable()
			this.renderMarkers();
		});

  if (this.props.formType === "Edit Route") {
      // this.points.push({
      //   lat: this.props.route.start_lat,
      //   lng: this.props.route.start_long
      // },{lat: this.props.route.end_lat,
      //  lng: this.props.route.end_long
      // })
			this.renderMarkers();
      this.toggleDisable()
  }
}

  renderMarkers(){
    const beginPoint = this.points[0];
    // console.log('beginPoitn===========',beginPoint)
    let endPoint = this.points[this.points.length - 1];
    this.setState({["marks"]: this.points})

    this.directionsService.route({
      origin: beginPoint,
      destination: endPoint,
      travelMode: google.maps.TravelMode.WALKING,
      unitSystem: google.maps.UnitSystem.IMPERIAL
    },
    (response, status) => {
      if (status === 'OK') {
        // const distance = response.routes[0].legs[0].distance.text;
        let thumbnail = this.getThumbnail(response);
        // let bounds = response.routes[0].bounds;
        this.directionsRenderer.setDirections(response);
        this.setState({
          image: thumbnail
        })
      } else {
        window.alert("Directions request faile due to " + status);
      }
    })
  }

  update(field) {
		return (e) => {
			this.setState({ [field]: e.currentTarget.value });
		};
	}

  searchAddress(address) {
		this.geocoder.geocode({ address: address }, (res, status) => {
			const locationName = res[0];
			if (status === "OK") {
				this.map.setCenter(res[0].geometry.location);
				this.setState({ ["location"]: res[0] });
			}
		});
	}

  removeLastPoint(){
    this.points.pop();
    this.renderMarkers();
    if (this.points.length === 1){
      this.points = []
      this.renderMarkers();
      this.setState({disabled: true})
    }
    this.directionsRenderer.setDirections({ routes: [] });
  }

   getThumbnail(res){
     debugger
    const start = 'https://maps.googleapis.com/maps/api/staticmap?';
    const size = 'size=200x200'
    const scale = 'scale=2'
    const markers = `markers=size:tiny|${this?.points[0]?.lat},${this?.points[0]?.lng}|${this?.points[1]?.lat},${this?.points[1]?.lng}`
    const path = `path=color:0xff0000ff|${this?.points[0]?.lat},${this?.points[0]?.lng}|${this?.points[1]?.lat},${this?.points[1]?.lng}`
    let key = `key=${window.api_key}`
    let url = []
    url.push(start,size,scale,markers,path,key)
    url = url.join("&")
    return url;
  }

  removeAllPoints(){
    if (this.points.length > 0){
      this.points = []
      this.setState({disabled: true})
    }
    this.directionsRenderer.setDirections({ routes: [] });
  }

  openModal(){
    document.querySelector('.modal').classList.toggle('open-modal');
    document.querySelector('.modal-background').classList.toggle('open-modal');
  }

   toggleDisable(){
     if(this.props.formType === 'Edit Route' && this.points.length === 2){
       this.setState({
         disabled: false
       })
     }
    if(this.points.length === 2){
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  };

  render(){
    return(
      <div>
        {/* {console.log('point0000000000000',this?.points[0]?.lat+','+this?.points[0]?.lng) || ''} */}
       <RouteNav />
      <div className="mapButtons">
        <div id="searchBarMain">
          <form className="search-bar" onSubmit={() => this.searchAddress(address)}>
            <input id="search-bar"
              className="input geocoder"
              type="text"
              placeholder="Coming Soon (Search address) - Click on map to add markers - 2 Markers needed to make route"
              value={this.state.address}
              onChange={this.update("address")}
            />
            {/* <button id="geocoder-submit">Search</button> */}
          </form>
        </div>
        <div id="mapButtonsRight">
          <button className="mapOtherButtons" onClick={this.removeLastPoint}><i className="fas fa-undo-alt"></i></button>
          <button className="mapOtherButtons" onClick={this.removeAllPoints}><i className="far fa-trash-alt"></i></button>
          <button className="mapSaveButtons" onClick={this.openModal} disabled={this.state.disabled}>Save</button>
        </div>
      </div>
      <div id='map' ref={(map) => (this.mapstart = map)}></div> 
      <div className="modal-background" onClick={() => this.openModal()}>
        <div className='modal' onClick={(e) => e.stopPropagation()} >
          <MapModal  action={this.props?.action} cords={this.state.marks} 
          session={this.props.session} image={this.state.image} title={this.state.title} 
          description={this.props?.route?.description} history={this.props?.history}
          route={this.props.route} formType={this.props.formType} routeId={this.props.routeId}
          />
        </div>
      </div>
      <MainFooter/>
      </div>
    )
  }
}

export default Maps;