import React, { useEffect } from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, } from 'react-google-maps';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { geolocated } from "react-geolocated";
import './Mapa.css';

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API;



export function Mapa(props) {
  const [latitude, setLatitude] = React.useState(30);
  const [longitude, setLongitude] = React.useState(30);
  const [smaller, setSmaller] = React.useState(false);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setSmaller(window.innerWidth <= 568);
    }, false);
  });


  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: latitude, lng: longitude }}
      defaultOptions={{
        streetViewControl: false,
        scaleControl: false,
        mapTypeControl: true,
        panControl: false,
        zoomControl: false,
        rotateControl: false,
        fullscreenControl: false
      }}
    >
    </GoogleMap>
  ));

  if (props.coords) {
    if (latitude !== props.coords.latitude) {
      setLatitude(props.coords.latitude);
    }

    if (longitude !== props.coords.longitude) {
      setLongitude(props.coords.longitude);
    }
  }


  const sizeButtom = smaller ? 'small' : 'medium';

  return (

    <div id="mapBox" >
      <Fab color="primary" aria-label="add" className="add-button" onClick={props.onAddEvent} size={sizeButtom}>
        <AddIcon />
      </Fab>
      <MapWithAMarker
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: latitude, lng: longitude }}
      />
    </div >
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Mapa);


