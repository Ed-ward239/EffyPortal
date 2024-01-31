
import './PageLayout.css';
import NavBar from "../Component/NavBar";
import LogIn from "../Component/LogIn";
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';
import Particles from '../Particles';
import { Button } from '@mui/material';

const PageLayout = () => {
    const isAuthenticated = useIsAuthenticated();
    // Check if the user is authenticated. If yes, render the BodyPage component. Otherwise, render the LogIn component.
    return(
        <>
            {isAuthenticated ? <BodyPage/> : <LogIn/>}
        </>
    )
};

const BodyPage = () =>{
    const navigate = useNavigate();

    function clickCarnival(event) {
        event.preventDefault();
        navigate('/Carnival');
    }
    function clickNCL(event) {
        event.preventDefault();
        navigate('/NCL');
    }
    return (
      <div className="container">
        <NavBar />
        <div className="functionalBoxes">
          {/* Render two buttons for Carnival and NCL functionalities. When clicked, navigate to the respective pages. */}
          <div className='btnContainer'>
            <Button className="carnivalBox" onClick={clickCarnival}>Carnival</Button>
            <Button className="nclBox" onClick={clickNCL}>NCL</Button>
          </div>
        </div>
        <Particles />
      </div>
    );
}

export default PageLayout;