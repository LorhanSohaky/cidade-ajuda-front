import React, { useEffect } from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { geolocated } from "react-geolocated";
import { Map, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import './Mapa.css';

const DEFAULT_VIEWPORT = {
  center: [51.505, -0.09],
  zoom: 18,
}

export function Mapa({ isGeolocationAvailable, coords,...props }) {
  const [latitude, setLatitude] = React.useState(30);
  const [longitude, setLongitude] = React.useState(30);
  const [smaller, setSmaller] = React.useState(false);
	const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT);

	useEffect((viewport)=>{
		if (coords){
			setViewport({...viewport, center:[coords.latitude, coords.longitude]})
		}
	},[isGeolocationAvailable, coords])

 
  if (props.coords) {
    if (latitude !== props.coords.latitude) {
      setLatitude(props.coords.latitude);
    }

    if (longitude !== props.coords.longitude) {
      setLongitude(props.coords.longitude);
    }
  }


	useEffect(() => {
    window.addEventListener('resize', () => {
      setSmaller(window.innerWidth <= 568);
    }, false);
		})


  const sizeButtom = smaller ? 'small' : 'medium';

  return (

    <div id="mapBox" >
      <Fab color="primary" aria-label="add" className="add-button" onClick={props.onAddEvent} size={sizeButtom}>
        <AddIcon />
      </Fab>
			<Map
				style={{height: '100%'}}
				maxZoom={19}
        onViewportChanged={newViewport => setViewport(newViewport)}
        viewport={viewport}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </Map>
    </div >
  );
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: true,
  },
  userDecisionTimeout: 5000,
})(Mapa);


