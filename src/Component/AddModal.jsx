// Draft_Testing
import React, { useState } from "react";

import "./Modal.css";
import UploadPDF from "./UploadPDF_Car";

const AddModal = ({ closeModal, defaultValue, props }) => {
  const [formState ] = useState(
    defaultValue || {
      shipName: "",
      voyageNum: "",
      date: "",
      effyShare: "",
      statusPaid: "unpaid",
      editedBy: "",
      revSS: "",
      revCC:"",      
      execFolio: "",
      euRev: "",
      carnivalShare: "",
      officeSup:"",
      discount: "",
      ssFee: "",
      ccFee: "",
      mealCharge:"",
      cashAdv: "",
      cashPaid: "",
      paroleFee: "",
    }
  );

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
            <input name="shipName" placeholder="Ship Name" onChange={handleInputChange} value={formState.shipName} />
          </div>
          <div className="form-group">
            <input name="voyageNum" placeholder="Voyage #" onChange={handleInputChange} value={formState.voyageNum} />
          </div>
          <div className="form-group">
            <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={formState.date} />
          </div>
          <div className="form-group">
            <input name="effyShare" placeholder="Effy Share" onChange={handleInputChange} value={formState.effyShare} />
          </div>
          <div className="form-group">
            <input name="editedBy" placeholder="Edited By" onChange={handleInputChange} value={formState.editedBy} />{/* Lock user fill/typing */}
          </div> 
          <div className="form-group">
            <input name="revSS" placeholder="Revenue S&S" onChange={handleInputChange} value={formState.revSS} />
          </div> 
          <div className="form-group">
            <input name="revCC" placeholder="Revenue CC" onChange={handleInputChange} value={formState.revCC} />
          </div>
          <div className="form-group">
            <input name="ssFee" placeholder="S&S Fee" onChange={handleInputChange} value={formState.ssFee} />
          </div>
          <div className="form-group">
            <input name="ccFee" placeholder="CC Fee" onChange={handleInputChange} value={formState.ccFee} />
          </div>
          <div className="form-group">
            <input name="euRev" placeholder="EU Share" onChange={handleInputChange} value={formState.euRev} />
          </div>
          <div className="form-group">
            <input name="discount" placeholder="Discount" onChange={handleInputChange} value={formState.discount} />
          </div>
          <div className="form-group">
            <input name="carnivalShare" placeholder="Carnival Share" onChange={handleInputChange} value={formState.carnivalShare} />
          </div>
          <div className="form-group">
            <input name="execFolio" placeholder="Exec. Folio" onChange={handleInputChange} value={formState.execFolio} />
          </div>
          <div className="form-group">
            <input name="mealCharge" placeholder="Meal Charge" onChange={handleInputChange} value={formState.mealCharge} />
          </div>
          <div className="form-group">
            <input name="officeSup" placeholder="Office Supplies" onChange={handleInputChange} value={formState.officeSup} />
          </div>
          <div className="form-group">
            <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={formState.cashPaid} />
          </div>
          <div className="form-group">
            <input name="cashAdv" placeholder="Cash Advance" onChange={handleInputChange} value={formState.cashAdv} />
          </div>
          <div className="form-group">
            <input name="paroleFee" placeholder="Parole Fee" onChange={handleInputChange} value={formState.paroleFee} />
          </div>
          <div className="form-group-status">
            <label htmlFor="statusPaid">Status</label>
            <select 
              name="statusPaid"
              onChange={handleInputChange}
              value={formState.statusPaid}
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          <div className="btns">
            <button type="submit" className="submitBtn">Submit</button>
            <UploadPDF/>
          </div>
        </form>
      </div>
      </div>
    )
} 
export default AddModal;
