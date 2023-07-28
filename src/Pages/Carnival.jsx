import React from 'react';
import { useState } from 'react';
import Navbar from '../Component/NavBar'
import Button from '@mui/material/Button';
import "./Carnival.css";
import { CollapsibleTable } from '../Component/Table';
import Search from '../Component/Search';
import ExportCSV from '../Component/ExportCSV';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { Modal } from '../Component/Modal';

function Carnival() {
    const [modalOpen, setModalOpen] = useState(false);
    const [rowToEdit, setRowToEdit] = useState(null);
    const [rows, setRows] = useState([
        {
            shipName: "Zulu",
            voyageNum: "ZL320923239",
            date: "11-23-2020",
            effyShare:"234522",
            statusPaid: "pending",
            editedBy: "Lucy",
            revSS: "21398",
            euRev: "349823",
            discount: "340",
            mealCharge: "139",
            revCC: "894",
            carnivalShare: "30232",
            ssFee: "3431",
            cashAdv: "3982",
            execFolio: "34902",
            officeSup: "43",
            ccFee: "1903",
            cashPaid: "304",
            paroleFee: "920",
        }, {
            shipName: "Tango",
            voyageNum: "TG320923542",
            date: "11-23-2021",
            effyShare:"234522",
            statusPaid: "paid",
            editedBy: "Ei",
            revSS: "21398",
            euRev: "349823",
            discount: "340",
            mealCharge: "139",
            revCC: "894",
            carnivalShare: "30232",
            ssFee: "3431",
            cashAdv: "3982",
            execFolio: "34902",
            officeSup: "43",
            ccFee: "1903",
            cashPaid: "304",
            paroleFee: "920", 
        }, {
            shipName: "Bravo",
            voyageNum: "BV323672939",
            date: "11-23-2022",
            effyShare:"234522",
            statusPaid: "unpaid",
            editedBy: "Lee",
            revSS: "21398",
            euRev: "349823",
            discount: "340",
            mealCharge: "139",
            revCC: "894",
            carnivalShare: "30232",
            ssFee: "3431",
            cashAdv: "3982",
            execFolio: "34902",
            officeSup: "43",
            ccFee: "1903",
            cashPaid: "304",
            paroleFee: "920",
        },
        {
            shipName: "Tango",
            voyageNum: "TG320923542",
            date: "11-23-2021",
            effyShare:"234522",
            statusPaid: "paid",
            editedBy: "Ei",
            revSS: "21398",
            euRev: "349823",
            discount: "340",
            mealCharge: "139",
            revCC: "894",
            carnivalShare: "30232",
            ssFee: "3431",
            cashAdv: "3982",
            execFolio: "34902",
            officeSup: "43",
            ccFee: "1903",
            cashPaid: "304",
            paroleFee: "920", 
        },
    ]);

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
            <div className='pageHeader'>
                <div className='carnivalTxt'>CARNIVAL DATA</div>
            </div>
            <div className='tableDiv'>
                <CollapsibleTable rows={rows} deleteRow={handleDeleteRow} editRow={handleEditRow} />
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
    )
}

export default Carnival;