import React, { useEffect } from 'react'
import { withRouter } from 'react-router'

import { Box, Fab } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { geolocated } from 'react-geolocated'
import { Map as LeafMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { paths } from '../../routes'

const DEFAULT_VIEWPORT = {
  center: [51.505, -0.09],
  zoom: 17
}

export function Map ({ history, coords }) {
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

  const handleClick = () => {
    history.push(paths.incident.create)
  }

  return (
    <Box height='100%'>
      <AddButton
        color='primary'
        aria-label='report incident'
        onClick={handleClick}
        size={sizeButtom}
      >
        <AddIcon />
      </AddButton>

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
    </Box>
  )
}

const AddButton = styled(Fab)(({ theme }) => ({
  position: 'absolute',
  zIndex: 401,
  bottom: theme.spacing(10),
  right: theme.spacing(1)
}))

const gelocatedProps = {
  positionOptions: {
    enableHighAccuracy: true
  }
}

export default withRouter(geolocated(gelocatedProps)(Map))
