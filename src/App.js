import NavBar from './Component/NavBar';
import Particle from './Particles';
import Home from './Pages/PageLayout'
import NCL from './Pages/NCL';
import Carnival from './Pages/Carnival';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { MsalProvider } from '@azure/msal-react';

function App({msalInstance}) {
  return (
    <>
      <MsalProvider instance={msalInstance}>
        <Pages/>
      </MsalProvider>
    </>
  );
}

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/Carnival" element={<Carnival/>}/>
      <Route path="/NCL" element={<NCL/>}/>
    </Routes>
  );
}

export default App;
