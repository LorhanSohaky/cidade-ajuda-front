import React, { useState } from 'react'

import { Box } from '@material-ui/core'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { LocationOn, Person, Poll } from '@material-ui/icons'

import Map from '../Map'
import Relatorio from '../Relatorio/Relatorio'

const Home = () => {
  const [active, setActive] = useState('map')

  function handleEvent (_, value) {
    setActive(value)
  }

  return (
    <Box display='flex' flexDirection='column' height='100vh'>
      <Content active={active} />
      <Menu active={active} onChange={handleEvent} />
    </Box>
  )
}

const contents = {
  map: {
    label: 'Mapa',
    value: 'map'
  },
  report: {
    label: 'Relatório',
    value: 'report'
  },
  profile: {
    label: 'Perfil',
    value: 'profile'
  }
}

const Content = ({ active }) => {
  const content = {}
  content[contents.map.value] = <Map />
  content[contents.report.value] = <Relatorio />

  return <Box height='100%'>{content[active] || <p>Default</p>}</Box>
}

const Menu = ({ active, onChange }) => {
  return (
    <BottomNavigation value={active} onChange={onChange}>
      <BottomNavigationAction
        label={contents.map.label}
        value={contents.map.value}
        icon={<LocationOn />}
      />
      <BottomNavigationAction
        label={contents.report.label}
        value={contents.report.value}
        icon={<Poll />}
      />
      <BottomNavigationAction
        label={contents.profile.label}
        value={contents.profile.value}
        icon={<Person />}
      />
    </BottomNavigation>
  )
}

export default Home
