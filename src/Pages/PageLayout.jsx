import './PageLayout.css';
import NavBar from "../Component/NavBar";
import LogIn from "../Component/LogIn";
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';
import Particles from '../Particles';
import { Button } from '@mui/material';


const PageLayout = () => {
    const isAuthenticated = useIsAuthenticated();
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
                <Button className="carnivalBox" variant="outlined" onClick={clickCarnival}></Button>
                <Button className="nclBox" variant="outlined" onClick={clickNCL}></Button>
            </div>
            <Particles/>
        </div>
    )
}

export default PageLayout;
