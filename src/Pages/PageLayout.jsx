import './PageLayout.css';
import NavBar from "../Component/NavBar";
import LogIn from "../Component/LogIn";
import { useIsAuthenticated } from "@azure/msal-react";
import { useNavigate } from 'react-router-dom';

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
                <button className="carnivalBox" onClick={clickCarnival}>Carnival</button>
                <button className="nclBox" onClick={clickNCL}>NCL</button>
            </div>
        </div>
    )
}

export default PageLayout;