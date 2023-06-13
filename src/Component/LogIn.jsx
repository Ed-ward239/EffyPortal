import React from "react";
import { useMsal } from '@azure/msal-react';
import './LogIn.css';
import Particle from "../Particles";
import LoginIcon from '@mui/icons-material/Login';
import Effy from '../Image/Effy.png';

export default function LogIn() {
  const { instance } = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ['user.read']
    });
  }
  
  return (
    <>
      <div className="headerDiv">
        <div className="header"><h2 className="headerTxt"><img alt="Login" src={Effy}/>Portal</h2></div>
            <button className="signInBtn" onClick={handleSignIn}><LoginIcon/> Log In</button>
      </div>
      <Particle/>
      <div className="devWatermark">Developed by Edward Lee</div>
    </>

  );
};