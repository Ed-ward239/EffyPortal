import React from 'react';
import Navbar from '../Component/NavBar'
import "./Carnival.css";
import Table from '../Component/Table';


function Carnival() {
    return (
        <div>
            <Navbar/>
            <h3 className='pageHeader'>
                <span className='carnivalTxt'>CARNIVAL DATA</span>
            </h3>
            <Table/>
        </div>
    )
}

export default Carnival;