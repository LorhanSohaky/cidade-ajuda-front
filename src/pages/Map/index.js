import React, { useEffect } from 'react'
import { withRouter } from 'react-router'

import { Box, Fab } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { Map as LeafMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { paths } from '../../routes'
import { connect } from 'react-redux'

const DEFAULT_VIEWPORT = {
  center: [51, -0.09],
  zoom: 17
}

export function Map ({ history, coords, dimensions }) {
  const [smaller, setSmaller] = React.useState(false)
  const [loadedLocation, setLoadedLocation] = React.useState(false)
  const [viewport, setViewport] = React.useState(DEFAULT_VIEWPORT)

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

export default connect(state => ({
  coords: state.settingsState.coords,
  dimensions: state.settingsState.dimensions
}))(withRouter(Map))
