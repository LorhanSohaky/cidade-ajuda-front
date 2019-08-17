import React, { useState } from 'react';
import './App.css';
import BottomMenu from './components/BottomMenu/BottomMenu';
import Mapa from './pages/Mapa/Mapa';
import Relatorio from './pages/Relatorio/Relatorio';

function App({ history }) {
  const [active, setActive] = useState('mapa');

  function handleEvent(newValue) {
    setActive(newValue);
  }

  function handleAddOcorrencia() {
    history.push('/nova-ocorrencia');
  }

  return (
    <div className="App">
      <div className="content">
        {(active === 'mapa') && <Mapa onAddEvent={handleAddOcorrencia} />}
        {(active === 'relatorio') && <Relatorio />}
      </div>
      <div className="menu">
        <BottomMenu default_state={active} onChange={handleEvent} />
      </div>
    </div>
  );
}

export default App;
