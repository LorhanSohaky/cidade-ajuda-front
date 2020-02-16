import React, { useEffect, useRef } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Box, Fab } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { Map as LeafMap, TileLayer, Marker, Popup } from 'react-leaflet'

import { paths } from '../../routes'
import API from '../../services/api'

const DEFAULT_VIEWPORT = {
  center: [51, -0.09],
  zoom: 17
}

export function Map ({ history, coords, dimensions }) {
  const [smaller, setSmaller] = React.useState(false)
  const [loadedLocation, setLoadedLocation] = React.useState(false)
  const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT)
  const [markers, setMarkers] = React.useState([])

  const mapRef = useRef(null)

  function handleBounds (element) {
    const bounds = element.getBounds()
    const southWest = Object.values(bounds._southWest)
    const northEast = Object.values(bounds._northEast)

    API.listIncidents({ southWest, northEast })
      .then(response => {
        const incidents = response.data.results.map(
          ({ id, latitude, longitude, descricao }) => ({
            id,
            position: [latitude, longitude],
            descricao
          })
        )
        setMarkers(incidents)
      })
      .catch(err => {
        console.error(err)
      })
  }

  useEffect(() => {
    handleBounds(mapRef.current.leafletElement)
  }, [])

  useEffect(() => {
    if (coords && !loadedLocation) {
      setViewport(prevViewport => ({
        ...prevViewport,
        center: [coords.latitude, coords.longitude]
      }))
      setLoadedLocation(true)
    }
  }, [coords, loadedLocation])

  useEffect(() => {
    if (dimensions) {
      setSmaller(dimensions.width <= 568)
    }
  }, [dimensions])

  const sizeButtom = smaller ? 'small' : 'medium'

  const handleClick = () => {
    history.push(paths.incident.create)
  }

  const Markers = () =>
    markers.map(item => {
      return (
        <Marker key={`marker-${item.id}`} position={item.position}>
          <Popup>{item.descricao}</Popup>
        </Marker>
      )
    })

  return (
    <Box flex={1}>
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
        ref={mapRef}
        onViewportChanged={newViewport =>
          newViewport && setViewport(newViewport)
        }
        viewport={viewport}
        onMoveend={event => handleBounds(event.target)}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <Markers />
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

export default connect(state => ({
  coords: state.settingsState.coords,
  dimensions: state.settingsState.dimensions
}))(withRouter(Map))
