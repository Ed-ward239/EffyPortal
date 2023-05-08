import React, { useState } from "react";
import "./NavBar.css";
import { WelcomeName } from "./WelcomeName";
import PersonIcon from '@mui/icons-material/Person';
import LogOut from '../Component/LogOut';
import { useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    // Menu bar onClick Functions
    function handleClick(event) {
        event.preventDefault();
        navigate('/');
    }
  // Menu icon toggle ON/OFF
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const [isOpen, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleClick}>
        EFFY Portal
      </div>
      <div className="navbar-items">
        <div className={`navbarMenu ${isMenuOpen ? "show" : ""}`}>
          <a>{<LogOut/>}</a>
        </div>
        <a className="BurgerMenu" onClick={toggleMenu}>
          <PersonIcon fontSize="large" direction="left" color="white" rounded toggled={isOpen} toggle={setOpen} />
          {<WelcomeName/>}
        </a>
      </div>
    </nav>
  );
  }
