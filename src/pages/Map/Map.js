import React, { useEffect, useRef, useState } from 'react'
import { Map as LeafMap, TileLayer, Marker } from 'react-leaflet'
import { connect } from 'react-redux'

import API from '../../services/api'

function Map ({ initialCoords, coords, onSelectMarker, onError = () => {} }) {
  const [loadedLocation, setLoadedLocation] = React.useState(false)
  const [viewport, setViewport] = React.useState(initialCoords)
  const [markers, setMarkers] = React.useState([])

  const mapRef = useRef(null)

  const [types, setTypes] = useState({})

  React.useEffect(() => {
    API.getTypes()
      .then(({ data }) => {
        const transformatedData = data.results.reduce((obj, { id, titulo }) => {
          obj[id] = { id, titulo }
          return obj
        }, {})
        setTypes(transformatedData)
      })
      .catch(err => {
        console.error(err)
        onError(err)
      })
  }, [])

  function handleBounds (map) {
    const bounds = map.getBounds()
    const southWest = Object.values(bounds._southWest)
    const northEast = Object.values(bounds._northEast)

    API.listIncidents({ southWest, northEast })
      .then(response => {
        /* eslint-disable camelcase */
        const incidents = response.data.results.map(
          ({
            id,
            latitude,
            longitude,
            descricao,
            tipo,
            transitavel_a_pe,
            transitavel_veiculo,
            quantidade_existente,
            quantidade_inexistente,
            quantidade_caso_encerrado
          }) => ({
            id,
            tipo: types[tipo].titulo,
            position: [latitude, longitude],
            descricao,
            transitavelAPe: transitavel_a_pe,
            transitavelVeiculo: transitavel_veiculo,
            quantidadeExistente: quantidade_existente,
            quantidadeInexistente: quantidade_inexistente,
            quantidadeCasoEncerrado: quantidade_caso_encerrado
          })
        )
        setMarkers(incidents)
        /* eslint-enable camelcase */
      })
      .catch(err => {
        console.error(err)
        onError(err)
      })
  }

  useEffect(() => {
    const hasTypes = Object.keys(types).length > 0
    hasTypes && handleBounds(mapRef.current.leafletElement)
  }, [types, viewport])

  useEffect(() => {
    if (coords && !loadedLocation) {
      setViewport(prevViewport => ({
        ...prevViewport,
        center: [coords.latitude, coords.longitude]
      }))
      setLoadedLocation(true)
    }
  }, [coords, loadedLocation])

  const Markers = () =>
    markers.map(item => (
      <Marker
        key={`marker-${item.id}`}
        position={item.position}
        onclick={() => onSelectMarker(item)}
      />
    ))

  return (
    <LeafMap
      style={{ height: '100%' }}
      maxZoom={19}
      ref={mapRef}
      onViewportChanged={newViewport => newViewport && setViewport(newViewport)}
      viewport={viewport}
    >
      <TileLayer
        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Markers />
    </LeafMap>
  )
}

export default connect(state => ({
  coords: state.settingsState.coords
}))(Map)
