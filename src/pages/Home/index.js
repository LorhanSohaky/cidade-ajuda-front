import React, { useState } from 'react'
import './App.css'
import BottomMenu from '../../components/BottomMenu/BottomMenu'
import Mapa from '../Mapa/Mapa'
import Relatorio from '../Relatorio/Relatorio'
import { paths } from '../../routes'

function App ({ history }) {
  const [active, setActive] = useState('mapa')

  function handleEvent (newValue) {
    setActive(newValue)
  }

  function handleAddOcorrencia () {
    history.push(paths.incident.create)
  }

  return (
    <div className='App'>
      <div className='content'>
        {active === 'mapa' && <Mapa onAddEvent={handleAddOcorrencia} />}
        {active === 'relatorio' && <Relatorio />}
      </div>
      <div className='menu'>
        <BottomMenu default_state={active} onChange={handleEvent} />
      </div>
    </div>
  )
}

export default App
