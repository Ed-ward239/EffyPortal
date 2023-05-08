import React from "react";
import { useMsal } from '@azure/msal-react';
import './LogIn.css';
import Particle from "../Particles";

export default function LogIn() {
  const { instance } = useMsal();

  const handleSignIn = () => {
    instance.loginRedirect({
      scopes: ['user.read']
    });
    console.log("Btn Clicked");
  }
  
  return (
    <div>
        <div className="header"><h2>EFFY Portal</h2></div>
            <button onClick={handleSignIn}>Log In</button>
    </div>
  );
};