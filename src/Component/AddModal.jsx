// Draft_Testing
import React, { useState } from "react";
import Button from '@mui/material/Button';
import "./Modal.css";
import UploadPDF from "./UploadPDF_Car";

const AddModal = ({ props }) => {
  const initFormState = []
  const [ row, setRow ] = useState(initFormState)

  const handleInputChange = (e) => {
    const {voyageNum, value } = e.target
    setRow({ ...row, [voyageNum]: value})
  }
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
          <div className="form-group">
            <input name="shipName" placeholder="Ship Name" onChange={handleInputChange} value={row.shipName} />
          </div>
          <div className="form-group">
            <input name="voyageNum" placeholder="Voyage #" onChange={handleInputChange} value={row.voyageNum} />
          </div>
          <div className="form-group">
            <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={row.date} />
          </div>
          <div className="form-group">
            <input name="effyShare" placeholder="Effy Share" onChange={handleInputChange} value={row.effyShare} />
          </div>
          <div className="form-group">
            <input name="editedBy" placeholder="Edited By" onChange={handleInputChange} value={row.editedBy} />{/* Lock user fill/typing */}
          </div> 
          <div className="form-group">
            <input name="revSS" placeholder="Revenue S&S" onChange={handleInputChange} value={row.revSS} />
          </div> 
          <div className="form-group">
            <input name="revCC" placeholder="Revenue CC" onChange={handleInputChange} value={row.revCC} />
          </div>
          <div className="form-group">
            <input name="ssFee" placeholder="S&S Fee" onChange={handleInputChange} value={row.ssFee} />
          </div>
          <div className="form-group">
            <input name="ccFee" placeholder="CC Fee" onChange={handleInputChange} value={row.ccFee} />
          </div>
          <div className="form-group">
            <input name="euRev" placeholder="EU Share" onChange={handleInputChange} value={row.euRev} />
          </div>
          <div className="form-group">
            <input name="discount" placeholder="Discount" onChange={handleInputChange} value={row.discount} />
          </div>
          <div className="form-group">
            <input name="carnivalShare" placeholder="Carnival Share" onChange={handleInputChange} value={row.carnivalShare} />
          </div>
          <div className="form-group">
            <input name="execFolio" placeholder="Exec. Folio" onChange={handleInputChange} value={row.execFolio} />
          </div>
          <div className="form-group">
            <input name="mealCharge" placeholder="Meal Charge" onChange={handleInputChange} value={row.mealCharge} />
          </div>
          <div className="form-group">
            <input name="officeSup" placeholder="Office Supplies" onChange={handleInputChange} value={row.officeSup} />
          </div>
          <div className="form-group">
            <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={row.cashPaid} />
          </div>
          <div className="form-group">
            <input name="cashAdv" placeholder="Cash Advance" onChange={handleInputChange} value={row.cashAdv} />
          </div>
          <div className="form-group">
            <input name="paroleFee" placeholder="Parole Fee" onChange={handleInputChange} value={row.paroleFee} />
          </div>
          <div className="form-group-status">
            <label htmlFor="statusPaid">Status</label>
            <select 
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
            <Button className="submitBtn" variant="outlined">Submit</Button>
            <UploadPDF/>
          </div>
        </form>
      </div>
      </div>
    )
} 
export default AddModal;
