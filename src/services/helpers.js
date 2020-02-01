import { geolocated } from 'react-geolocated'
import { useEffect } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import settingsActions from '../redux/settings'

const gelocatedProps = {
  positionOptions: {
    enableHighAccuracy: true
  },
  watchPosition: true
}

const _geolocatedHandler = connect(null, dispatch =>
  bindActionCreators({ setCoords: settingsActions.setCoords }, dispatch)
)(({ coords, setCoords }) => {
  useEffect(() => {
    if (coords) {
      const { latitude, longitude } = coords
      setCoords({ latitude, longitude })
    }
  }, [coords, setCoords])

  return null
})

export const GeolocatedHandler = geolocated(gelocatedProps)(_geolocatedHandler)
