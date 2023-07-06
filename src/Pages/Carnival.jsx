import React from 'react';
import { useState } from 'react';
import Navbar from '../Component/NavBar'
import Button from '@mui/material/Button';
import "./Carnival.css";
import Table from '../Component/Table';
import Search from '../Component/Search';
import ExportCSV from '../Component/ExportCSV';
//import AddData from '../Component/AddData';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import Modal from '../Component/Modal';

function Carnival() {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState();

    const handleDeleteRow = (targetIndex) => {
      setRows(rows.filter((_, idx) => idx !== targetIndex));
    };
  
    const handleEditRow = (idx) => {
      setRowToEdit(idx);
      setModalOpen(true);
    };
    const handleSubmit = (newRow) => {
        rowToEdit === null
          ? setRows([...rows, newRow])
          : setRows(
              rows.map((currRow, idx) => {
                if (idx !== rowToEdit) return currRow;
                return newRow;
              })
            );
        };

    return (
        <div>
            <Navbar/>
            <h3 className='pageHeader'>
                <span className='carnivalTxt'>CARNIVAL DATA</span>
            </h3>
            <div className='tableDiv'>
                <Table rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
                <div className='carnivalContainer'>
                    
                    <div className="searchNBtns">
                        <Search/>
                        <Button 
                            className="addBtn" 
                            variant="outlined" 
                            startIcon={<PlaylistAddIcon/>} 
                            onClick={() => setModalOpen(true)}>Add</Button>    
                        {modalOpen && (
                            <Modal
                                closeModal={() => {
                                setModalOpen(false);
                                setRowToEdit(null);
                            }}
                                onSubmit={handleSubmit}
                                defaultValue={rowToEdit !== null && rows[rowToEdit]}
                            />
                        )}
                        <ExportCSV/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carnival;