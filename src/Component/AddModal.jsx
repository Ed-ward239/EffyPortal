// Draft_Testing
import React, { useState, useEffect } from "react";

import "./Modal.css";
import UploadPDF from "./UploadPDF_Car";

const AddModal = ({ closeModal, onSubmit, defaultValue }) => {
  const [formState, setFormState] = useState(
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
  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.shipName && formState.voyageNum && formState.date && formState.effyShare && formState.statusPaid && formState.editedBy) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <div className="modalHeaderTxt">Carnival Data Entry</div>
        <div className="formGrp">
        <form>
          <div className="form-group">
            <input name="shipName" placeholder="Ship Name" onChange={handleChange} value={formState.shipName} />
          </div>
          <div className="form-group">
            <input name="voyageNum" placeholder="Voyage #" onChange={handleChange} value={formState.voyageNum} />
          </div>
          <div className="form-group">
            <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleChange} value={formState.date} />
          </div>
          <div className="form-group">
            <input name="effyShare" placeholder="Effy Share" onChange={handleChange} value={formState.effyShare} />
          </div>
          <div className="form-group">
            <input name="editedBy" placeholder="Edited By" onChange={handleChange} value={formState.editedBy} />{/* Lock user fill/typing */}
          </div> 
          <div className="form-group">
            <input name="revSS" placeholder="Revenue S&S" onChange={handleChange} value={formState.revSS} />
          </div> 
          <div className="form-group">
            <input name="revCC" placeholder="Revenue CC" onChange={handleChange} value={formState.revCC} />
          </div>
          <div className="form-group">
            <input name="ssFee" placeholder="S&S Fee" onChange={handleChange} value={formState.ssFee} />
          </div>
          <div className="form-group">
            <input name="ccFee" placeholder="CC Fee" onChange={handleChange} value={formState.ccFee} />
          </div>
          <div className="form-group">
            <input name="euRev" placeholder="EU Share" onChange={handleChange} value={formState.euRev} />
          </div>
          <div className="form-group">
            <input name="discount" placeholder="Discount" onChange={handleChange} value={formState.discount} />
          </div>
          <div className="form-group">
            <input name="carnivalShare" placeholder="Carnival Share" onChange={handleChange} value={formState.carnivalShare} />
          </div>
          <div className="form-group">
            <input name="execFolio" placeholder="Exec. Folio" onChange={handleChange} value={formState.execFolio} />
          </div>
          <div className="form-group">
            <input name="mealCharge" placeholder="Meal Charge" onChange={handleChange} value={formState.mealCharge} />
          </div>
          <div className="form-group">
            <input name="officeSup" placeholder="Office Supplies" onChange={handleChange} value={formState.officeSup} />
          </div>
          <div className="form-group">
            <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleChange} value={formState.cashPaid} />
          </div>
          <div className="form-group">
            <input name="cashAdv" placeholder="Cash Advance" onChange={handleChange} value={formState.cashAdv} />
          </div>
          <div className="form-group">
            <input name="paroleFee" placeholder="Parole Fee" onChange={handleChange} value={formState.paroleFee} />
          </div>
          <div className="form-group-status">
            <label htmlFor="statusPaid">Status</label>
            <select 
              name="statusPaid"
              onChange={handleChange}
              value={formState.statusPaid}
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
            </select>
          </div>
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <div className="btns">
            <button type="submit" className="submitBtn" onClick={handleSubmit}>Submit</button>
            <UploadPDF/>
          </div>
        </form>
        </div>
      </div>
    </div>
  )
} 
export default AddModal;
