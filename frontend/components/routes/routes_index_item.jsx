import React from 'react'
import { Link, withRouter } from 'react-router-dom';


// const RoutesIndexItem = ({route, deleteRoute, session}) => {
//   // let mapstart;
//   //  const options = {
//   //     center: {lat: 40.6302923, lng: -74.1077045},
//   //     zoom: 15,
//   //     mapId: '2cf9dff401d20cef',
//   //     clickableIcons: false,
//   //     maxZoom: 15
//   //   };
//   //   map = new google.maps.Map(mapstart, options);
//   //   directionsRenderer.setMap(map)

//   return (
//     <div className="routeIdxItem"> 
//       <div className="routeIdxItemImage">
//         <img src={route.image}/> 
//         <Link to={`/routes/${route.id}`} className="routeIndexImage">
//           <img className="routeIndexImage" src={route.image} alt="route image"/> 
//           {/* <div id='map' ref={(map) => (mapstart = map)}></div> */}
//         </Link>
//         <div className="dropdownRt" >
//           <button className="dropbtnRt"> <i className="fas fa-wrench"></i></button>
//           <div className="dropdown_contentRt">
//             <a onClick={() => {deleteRoute(route.id)}}>Delete Route</a>
//             <Link to={`/routes/${route.id}/edit`}>Edit Route</Link>  
//           </div>
//         </div>
//       </div>
//       <div id="routeCardBottom">
//         <Link to={`/routes/${route.id}`} className="rtIdxTitle">{route.title}</Link><br/>
//         {/* <div id="rtIdxDistanceGroup">
//           <div className="rtIdxDistanceGroup">
//             <h1 className="rtIdxDistanceNum">{route.distance || 0}</h1> 
//             <h1 className="rtIdxDistanceMi">mi</h1>
//           </div> 
//           <h1 className="rtIdxDistance">Distance</h1>
//         </div> */}
//       </div>
//     </div>
//   )
// }


const RoutesIndexItem = ({route, deleteRoute, session}) => {

   const convertDate = (date) => {
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
  return (
    <div className="routeIdxItem"> 
      <div className="routeIdxItemImage">
        {/* <img src={route.image}/>  */}
        <Link to={`/routes/${route.id}`} className="routeIndexImage">
          <img className="routeIndexImage" src={route.image} alt="route image"/> 
        </Link>
        <div className="dropdownRt" >
          <button className="dropbtnRt"> <i className="fas fa-wrench"></i></button>
          <div className="dropdown_contentRt">
            <a onClick={() => {deleteRoute(route.id)}}>Delete Route</a>
            <Link to={`/routes/${route.id}/edit`}>Edit Route</Link>  
          </div>
        </div>
      </div>
      <div id="routeCardBottom">
        <Link to={`/routes/${route.id}`} className="rtIdxTitle">{route.title}</Link><br/>
        {/* <div id="rtIdxDistanceGroup">
          <div className="rtIdxDistanceGroup">
            <h1 className="rtIdxDistanceNum">{route.distance || 0}</h1> 
            <h1 className="rtIdxDistanceMi">mi</h1>
          </div> 
          <h1 className="rtIdxDistance">Distance</h1>
        </div> */}
      </div>
      <div className='rtIdx-distance'>
          <p className='rtIdx-Distance'>{route.distance} mi</p>
          <p className='rtIdx-DistanceLower'>Distance</p> 
        </div>
      <div className='rtIdx-created'>
        Created on {convertDate(route.created_at) || 0}
      </div>
    </div>
  )
}

export default  RoutesIndexItem;