import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import "./Modal.css";

const EditModal = (props) => {
    const [row, setRow] = useState(props.currentUser);
  
    useEffect(() => {
      setRow(props.currentUser);
    }, [props]);
  
    const handleInputChange = (event) => {
      const { voyageNum, value } = event.target;
  
      setRow({ ...row, [voyageNum]: value });
    };
  
    return (
      <div className="modal">
        <div className="modalBackground">
        <h3 className="modalHeaderTxt">Edit Data</h3>
      <form>
        <div className="form-group">
          <input name="shipName" placeholder="Ship Name" onChange={handleInputChange} value={row.id}/>
        </div>
        <div className="form-group">
          <input name="voyageNum" placeholder="Voyage #" onChange={handleInputChange} value={row.username}/>
        </div>
        <div className="form-group">
          <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={row.email}/>
        </div>
        <div className="form-group">
          <input name="effyShare" placeholder="Effy Share" onChange={handleInputChange} value={row.name}/>
        </div>
        <div className="form-group">
          <input name="editedBy" placeholder="Edited By" onChange={handleInputChange} value={row.editedBy}/>{/* Lock user fill/typing */}
        </div>
        <div className="form-group">
          <input name="revSS" placeholder="Revenue S&S" onChange={handleInputChange} value={row.revSS}/>
        </div>
        <div className="form-group">
          <input name="revCC" placeholder="Revenue CC" onChange={handleInputChange} value={row.zipcode}/>
        </div>
        <div className="form-group">
          <input name="ssFee" placeholder="S&S Fee" onChange={handleInputChange} value={row.suite}/>
        </div>
        <div className="form-group">
          <input name="ccFee" placeholder="CC Fee" onChange={handleInputChange} value={row.name}/>
        </div>
        <div className="form-group">
          <input name="euRev" placeholder="EU Share" onChange={handleInputChange} value={row.lat}/>
        </div>
        <div className="form-group">
          <input name="discount" placeholder="Discount" onChange={handleInputChange} value={row.lng}/>
        </div>
        <div className="form-group">
          <input name="carnivalShare" placeholder="Carnival Share" onChange={handleInputChange} value={row.phone}/>
        </div>
        <div className="form-group">
          <input name="execFolio" placeholder="Exec. Folio" onChange={handleInputChange} value={row.id}/>
        </div>
        <div className="form-group">
          <input name="mealCharge" placeholder="Meal Charge" onChange={handleInputChange} value={row.website}/>
        </div>
        <div className="form-group">
          <input name="officeSup" placeholder="Office Supplies" onChange={handleInputChange} value={row.name}/>
        </div>
        <div className="form-group">
          <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={row.street}/>
        </div>
        <div className="form-group">
          <input name="cashAdv" placeholder="Cash Advance" onChange={handleInputChange} value={row.city}/>
        </div>
        <div className="form-group">
          <input name="paroleFee" placeholder="Parole Fee" onChange={handleInputChange} value={row.zipcode}/>
        </div>
        <div className="form-group-status">
          <label htmlFor="statusPaid">Status</label>
          <select name="statusPaid" onChange={handleInputChange} value={row.username}>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
        <Button className="submitBtn" variant="outlined">Submit</Button>
      </form>
      </div>
      </div>
    );
  };
  
  export default EditModal;
  