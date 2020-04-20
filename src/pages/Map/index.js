import React, { useEffect, useCallback, useContext } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import { Box, Fab } from '@material-ui/core'
import { styled } from '@material-ui/core/styles'
import AddIcon from '@material-ui/icons/Add'

import { paths } from '../../routes'
import Popup from './Popup'
import Map from './Map'
import { ToastContext } from '../../services/ToastHandler'

const DEFAULT_VIEWPORT = {
  center: [51, -0.09],
  zoom: 17
}

export function MapPage ({ history, dimensions }) {
  const [smaller, setSmaller] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [selectedItem, setSelectedItem] = React.useState(null)
  const toastContext = useContext(ToastContext)

  useEffect(() => {
    if (dimensions) {
      setSmaller(dimensions.width <= 568)
    }
  }, [dimensions])

  const sizeButtom = smaller ? 'small' : 'medium'

  const handleClick = () => {
    history.push(paths.incident.create)
  }

  const handlePopup = (open, data) => {
    setSelectedItem(data)
    setOpen(open)
  }

  const handleError = useCallback(
    error => {
      toastContext.setMessage(`${error.message}`)
      toastContext.setSeverity('error')
      toastContext.setIsOpen(true)
      console.error(error)
    },
    [toastContext]
  )

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
      <Map
        initialCoords={DEFAULT_VIEWPORT}
        onSelectMarker={item => handlePopup(true, item)}
        onError={handleError}
      />
      <Popup
        open={open}
        onClose={() => handlePopup(false, {})}
        data={selectedItem}
      />
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
}))(withRouter(MapPage))
