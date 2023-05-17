import React from 'react';
import Navbar from '../Component/NavBar'
import "./Carnival.css";
import Table from '../Component/Table';
import Search from '../Component/Search';
import ExportCSV from '../Component/ExportCSV';
import Upload from '../Component/UploadPDF_Car';

function Carnival() {
    return (
        <div>
            <Navbar/>
            <h3 className='pageHeader'>
                <span className='carnivalTxt'>CARNIVAL DATA</span>
            </h3>
            <div className='tableDiv'>
                <div className='carnivalContainer'>
                    <Search/>
                    <ExportCSV/>
                </div>
                <div className='tableNupload'>
                    <Table/>
                    <Upload/>
                </div>
            </div>
        </div>
    )
}

export default Carnival;