import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Box } from '@material-ui/core'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { LocationOn, Person, Poll } from '@material-ui/icons'

import Map from '../Map'
import Report from '../Report'
import Login from '../Login'
import settingsActions from '../../redux/settings'
import User from '../User'

const Home = () => {
  const tab = useSelector(state => state.settingsState.tab)
  const dispatch = useDispatch()

  const handleEvent = (_, value) => {
    dispatch(settingsActions.setNavigationTab(value))
  }

  return (
    <Box display='flex' flex={1} flexDirection='column' height='100%'>
      <Content active={tab} />
      <Menu active={tab} onChange={handleEvent} />
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
  const user = useSelector(state => state.userState.me)
  content[contents.map.value] = <Map />
  content[contents.report.value] = <Report />
  content[contents.profile.value] = user ? <User /> : <Login />

  return (
    <Box flex={1} display='flex'>
      {content[active] || <p>Default</p>}
    </Box>
  )
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
