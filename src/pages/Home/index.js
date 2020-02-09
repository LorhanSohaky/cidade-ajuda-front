import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { Box } from '@material-ui/core'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import { LocationOn, Person, Poll } from '@material-ui/icons'

import Map from '../Map'
import Report from '../Report'
import Login from '../Login'
import settingsActions from '../../redux/settings'

const Home = ({ setNavigationTab, tab }) => {
  const handleEvent = (_, value) => {
    setNavigationTab(value)
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
  content[contents.map.value] = <Map />
  content[contents.report.value] = <Report />
  content[contents.profile.value] = <Login />

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

const mapStateToProps = state => ({
  tab: state.settingsState.tab
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setNavigationTab: settingsActions.setNavigationTab
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(Home)
