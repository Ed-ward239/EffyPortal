import * as React from "react";
import { useState } from "react";
import "./NavBar.css";
import { WelcomeName } from "./WelcomeName";
import { useNavigate } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Logout from "@mui/icons-material/Logout";
import SignOut from "./LogOut";
import PersonIcon from '@mui/icons-material/Person';
import Effy from '../Image/Effy.png'


export default function Navbar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState('');
    const open = Boolean(anchorEl);

    // Logo Home Btn
    function handleClick(event) {
        event.preventDefault();
        navigate('/EffyPortal');
    }
    // Menu bar onClick Functions
    const handleClickMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleClick}>
        <img alt="Effy Jewelery" src={Effy}/>
      </div>
      <div className="pfpIcon">
      <React.Fragment>
            <PersonIcon 
            className="iconBtn"
            onClick={handleClickMenu}
            size="medium"
            sx={{ width: 32, height: 32, ml: 2 }}>
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            &gt;
            </PersonIcon>
            {<WelcomeName/>}

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 2.5,
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0
            }
          }
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <SignOut/>
        </MenuItem>
      </Menu>
    </React.Fragment>
      </div>
    </nav>
  );
  }
