import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap, Marker, } from 'react-google-maps';
import { geolocated } from "react-geolocated";
import './Mapa.css';



export function Mapa(props) {
  const [latitude, setLatitude] = React.useState(30);
  const [longitude, setLongitude] = React.useState(30);

  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={15}
      defaultCenter={{ lat: latitude, lng: longitude }}
    >
      <Marker
        position={{ lat: -34.397, lng: 150.644 }}
      />
    </GoogleMap>
  ));

  if (props.coords) {
    if (latitude !== props.coords.latitude) {
      setLatitude(props.coords.latitude);
    }

    if (longitude !== props.coords.longitude) {
      setLongitude(props.coords.longitude);
    }
    console.log(latitude, longitude);
  }

  return (
    <div id="mapBox">
      <MapWithAMarker
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDfM2J35Kits1dRLyXV2xybtRizqD5rLUc&v=3.exp&libraries=geometry,drawing,places"
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
        center={{ lat: 25.03, lng: 21.6 }}
      />
    </div>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(Mapa);


