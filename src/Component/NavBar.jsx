import * as React from "react";
import { useState } from "react";
import "./NavBar.css";
import { WelcomeName } from "./WelcomeName";
import { useNavigate } from 'react-router-dom';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import IconButton from "@mui/material/IconButton";
import Logout from "@mui/icons-material/Logout";
import SignOut from "./LogOut";
import PersonIcon from '@mui/icons-material/Person';


export default function Navbar() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState('');
    const open = Boolean(anchorEl);

    // Logo Home Btn
    function handleClick(event) {
        event.preventDefault();
        navigate('/');
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
        EFFY Portal
      </div>
      <div className="pfpIcon">
      <React.Fragment>
          <IconButton
            className="iconBtn"
            onClick={handleClickMenu}
            size="medium"
            sx={{ ml: 1 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <PersonIcon sx={{ width: 32, height: 32 }}></PersonIcon>
          </IconButton>
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
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 0
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
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
          {<WelcomeName/>}
      </div>
    </nav>
  );
  }
