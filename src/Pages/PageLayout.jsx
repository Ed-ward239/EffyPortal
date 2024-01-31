
import './PageLayout.css';
import NavBar from "../Component/NavBar";
import LogIn from "../Component/LogIn";
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';
//import Particles from '../Particles';
//import { Button } from '@mui/material';

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
    function clickOther(event){
      event.preventDefault()
      alert("Coming Soon!")
    }

    return (
      <>
        <NavBar />
        <div className="greyBox">
          {/* Render two buttons for Carnival and NCL functionalities. When clicked, navigate to the respective pages. */}
          <div className='btnContainer'>
            <button className="carnivalBox" onClick={clickCarnival}><p className='ccl'>Carnival</p></button>
            <button className="nclBox" onClick={clickNCL}><p className='ncl'>NCL</p></button>
            <button className="otherBox" onClick={clickOther}><p className='other'>Other</p></button>
          </div>
        </div>
        {/*<Particles />*/}
      </>
    );
}

export default PageLayout;