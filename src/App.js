import React from 'react';
import "./App.css";
import Home from "./Home";

import logo from "./Assets/Logo.png"

function App() {
  return (
    <div className='App'>
          <div className="logodiv">
            <img src={logo} alt="" className="logo__img" />
            <p className="site__name">COVID</p>
            <p className="site__name">Tracker</p>
          </div>
          <Home />
    </div>
  );
}

export default App;