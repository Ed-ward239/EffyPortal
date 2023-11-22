
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
    return(
        <div className='container'>
            <NavBar/>
            <div className='functionalBoxes'>
                {/* Render two buttons for Carnival and NCL functionalities. When clicked, navigate to the respective pages. */}
                <Button className="carnivalBox" variant="outlined" onClick={clickCarnival}></Button>
                <Button className="nclBox" variant="outlined" onClick={clickNCL}></Button>
            </div>
            <Particles/>
        </div>
    )
}

export default PageLayout;

//
//In this code, we have a `PageLayout` component that checks if the user is authenticated using the `useIsAuthenticated` hook from the `@azure/msal-react` package. If the user is authenticated, the `BodyPage` component is rendered. Otherwise, the `LogIn` component is rendered.
//
//The `BodyPage` component contains a `NavBar`, two buttons for Carnival and NCL functionalities, and a `Particles` component. When the buttons are clicked, the user is navigated to the respective pages using the `useNavigate` hook from the `react-router-dom` package.
//
//The `Particles` component is used to create a background with particles..</s>