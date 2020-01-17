import React from 'react'

import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import PersonIcon from '@material-ui/icons/Person'
import PollIcon from '@material-ui/icons/Poll'
import LocationOnIcon from '@material-ui/icons/LocationOn'

function BottomMenu ({ defaultState, onChange }) {
  const [value, setValue] = React.useState(defaultState)

  function handleChange (event, newValue) {
    setValue(newValue)
    onChange(newValue)
  }

  return (
    <BottomNavigation value={value} onChange={handleChange}>
      <BottomNavigationAction
        label='Mapa'
        value='mapa'
        icon={<LocationOnIcon />}
      />
      <BottomNavigationAction
        label='Relatório'
        value='relatorio'
        icon={<PollIcon />}
      />
      <BottomNavigationAction
        label='Perfil'
        value='perfil'
        icon={<PersonIcon />}
      />
    </BottomNavigation>
  )
}

export default BottomMenu
