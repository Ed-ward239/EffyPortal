import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Particle from './Particles';
import { BrowserRouter } from 'react-router-dom';
import { PublicClientApplication, EventType } from '@azure/msal-browser';

const pca = new PublicClientApplication({
  auth: {
    clientId: '69dd816b-8ada-40b9-9cce-a194ccea1c50',
    authority: 'https://login.microsoftonline.com/8a91349d-6169-4e6a-9a2b-caad5be3c848',
    knownAuthorities: ['https://login.microsoftonline.com/8a91349d-6169-4e6a-9a2b-caad5be3c848'],
    redirectUri: '/',
  }
})

pca.addEventCallback(event => {
  if (event.eventType === EventType.LOGIN_SUCCESS){
    console.log(event);
    pca.setActiveAccount(event.payload.accessToken);
  }
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App msalInstance={pca}/>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
