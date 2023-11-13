import React, { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
//import Button from '@mui/material/Button';
import "./Modal.css";
import UploadPDF from "./UploadPDF";

const AddModal = ({ props }) => {
  const initFormState = [];
  const [ row, setRow ] = useState(initFormState);

  const handleInputChange = (e) => {
    const {name, value } = e.target;
    setRow({ ...row, [name]: value });
  }


  const { instance } = useMsal();
  const [username, setUsername] = useState('');
  const firstName = username.substring(0, username.indexOf("@"));
  const capitalName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
  useEffect(() => {
      const currentAccount = instance.getActiveAccount();
      if(currentAccount){
          setUsername(currentAccount.username);
      }
  }, [instance]);

  return (
    <div className="modal">
      <div className="modalBackground">
        <h3 className="modalHeaderTxt">Carnival Data Entry</h3>
        <form 
          onSubmit={e => {
            e.preventDefault()
            if(!row.voyageNum || !row.voyageNum) return
            props.AddModal(row)
            setRow(initFormState)
          }}>
          <div className="inputs">
            <input name="shipName" placeholder="Ship Name" onChange={handleInputChange} value={row.shipName} />
            <input name="voyageNum" placeholder="Voyage #" onChange={handleInputChange} value={row.voyageNum} />
            <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={row.date} />
            <input name="effyShare" placeholder="Effy Share" onChange={handleInputChange} value={row.effyShare} />
            <input name="editedBy" placeholder="Edited By" onChange={handleInputChange} value={capitalName} readOnly /> 
            <input name="revSS" placeholder="Revenue S&S" onChange={handleInputChange} value={row.revSS} /> 
            <input name="revCC" placeholder="Revenue CC" onChange={handleInputChange} value={row.revCC} />
            <input name="ssFee" placeholder="S&S Fee" onChange={handleInputChange} value={row.ssFee} />
            <input name="ccFee" placeholder="CC Fee" onChange={handleInputChange} value={row.ccFee} />
            <input name="euRev" placeholder="EU VAT" onChange={handleInputChange} value={row.euVAT} />
            <input name="discount" placeholder="Discount" onChange={handleInputChange} value={row.discount} />
            <input name="carnivalShare" placeholder="Carnival Share" onChange={handleInputChange} value={row.carnivalShare} />          
            <input name="execFolio" placeholder="Exec. Folio" onChange={handleInputChange} value={row.execFolio} />          
            <input name="mealCharge" placeholder="Meal Charge" onChange={handleInputChange} value={row.mealCharge} />          
            <input name="officeSup" placeholder="Office Supplies" onChange={handleInputChange} value={row.officeSup} />          
            <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={row.cashPaid} />          
            <input name="cashAdv" placeholder="Cash Advance" onChange={handleInputChange} value={row.cashAdv} />          
            <input name="paroleFee" placeholder="Parole Fee" onChange={handleInputChange} value={row.paroleFee} />
            <label className="statusPaidLabel">Status</label>
            <select 
              label="Status"
              name="statusPaid"
              onChange={handleInputChange}
              value={row.statusPaid}
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
            </select>
            </div>
          <div className="btns">
            <UploadPDF/>
            <button className="submitBtn">Submit</button>
          </div>
        </form>
      </div>
      </div>
    )
} 
export default AddModal;
