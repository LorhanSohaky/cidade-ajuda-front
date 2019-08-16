import React from 'react';
import { Map, Marker, GoogleApiWrapper, InfoWindow } from 'google-maps-react';
import { geolocated } from "react-geolocated";

export function Mapa(props) {
  const [latitude, setLatitude] = React.useState(30);
  const [longitude, setLongitude] = React.useState(30);

  const mapStyles = {
    width: '100%',
    height: '100%',
  };

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
    <Map
      google={props.google}
      zoom={15}
      style={mapStyles}
      center={{ lat: latitude, lng: longitude }}
    >
      <Marker position={{ lat: latitude, lng: longitude }} />
    </Map>
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
})(GoogleApiWrapper({
  apiKey: 'AIzaSyDfM2J35Kits1dRLyXV2xybtRizqD5rLUc'
})(Mapa));
