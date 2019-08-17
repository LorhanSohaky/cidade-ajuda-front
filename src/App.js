import React, { useState } from 'react';
import './App.css';
import BottomMenu from './components/BottomMenu/BottomMenu';
import Mapa from './pages/Mapa';
import Relatorio from './pages/Relatorio';

function App() {
  const [active, setActive] = useState('mapa');

  function handleEvent(newValue) {
    console.log(newValue);
    setActive(newValue);
  }

  return (
    <div className="App">
      <div className="content">
        {(active === 'mapa') && <Mapa className />}
        {(active === 'relatorio') && <Relatorio />}
      </div>
      <div className="menu">
        <BottomMenu default_state={active} onChange={handleEvent} />
      </div>
    </div>
  );
}

export default App;
