import React from 'react';
import Navbar from '../Component/NavBar';
//import Button from '@mui/material/Button';
import "./Carnival.css";
import Table from "../Component/Table";

function Carnival() {
    return (
        <div>
            <Navbar/>
            <div className='pageHeader'>
                <div className='carnivalTxt'>CARNIVAL DATA</div>
            </div>
                <Table/>
        </div>
    )
}

export default Carnival;