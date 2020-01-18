import React, { useEffect } from 'react'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import { geolocated } from 'react-geolocated'
import { Map as LeafMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './Mapa.css'

const DEFAULT_VIEWPORT = {
  center: [51.505, -0.09],
  zoom: 18
}

export function Map ({ isGeolocationEnabled, coords, ...props }) {
  const [smaller, setSmaller] = React.useState(false)
  const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT)

  useEffect(() => {
    if (!coords) {
      return
    }
    setViewport(prevViewport => ({
      ...prevViewport,
      center: [coords.latitude, coords.longitude]
    }))
  }, [coords])

  useEffect(() => {
    window.addEventListener(
      'resize',
      () => {
        setSmaller(window.innerWidth <= 568)
      },
      false
    )
  })

  const sizeButtom = smaller ? 'small' : 'medium'

  return (
    <div id='mapBox'>
      <Fab
        color='primary'
        aria-label='add'
        className='add-button'
        onClick={props.onAddEvent}
        size={sizeButtom}
      >
        <AddIcon />
      </Fab>
      <LeafMap
        style={{ height: '100%' }}
        maxZoom={19}
        onViewportChanged={newViewport => setViewport(newViewport)}
        viewport={viewport}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
      </LeafMap>
    </div>
  )
}

const gelocatedProps = {
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true
}

export default geolocated(gelocatedProps)(Map)
