import React, { useState, useEffect } from "react";

import "./Modal.css";

const EditModal = (props) => {
    const [user, setUser] = useState(props.currentUser);
  
    useEffect(() => {
      setUser(props.currentUser);
    }, [props]);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
  
      setUser({ ...user, [name]: value });
    };
  
    return (
      <form>
        <div className="form-group">
          <input name="shipName" placeholder="Ship Name" onChange={handleInputChange} value={user.id}/>
        </div>
        <div className="form-group">
          <input name="voyageNum" placeholder="Voyage #" onChange={handleInputChange} value={user.username}/>
        </div>
        <div className="form-group">
          <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={user.email}/>
        </div>
        <div className="form-group">
          <input name="effyShare" placeholder="Effy Share" onChange={handleInputChange} value={user.name}/>
        </div>
        <div className="form-group">
          <input name="editedBy" placeholder="Edited By" onChange={handleInputChange} value={user.editedBy}/>{/* Lock user fill/typing */}
        </div>
        <div className="form-group">
          <input name="revSS" placeholder="Revenue S&S" onChange={handleInputChange} value={user.revSS}/>
        </div>
        <div className="form-group">
          <input name="revCC" placeholder="Revenue CC" onChange={handleInputChange} value={user.zipcode}/>
        </div>
        <div className="form-group">
          <input name="ssFee" placeholder="S&S Fee" onChange={handleInputChange} value={user.suite}/>
        </div>
        <div className="form-group">
          <input name="ccFee" placeholder="CC Fee" onChange={handleInputChange} value={user.name}/>
        </div>
        <div className="form-group">
          <input name="euRev" placeholder="EU Share" onChange={handleInputChange} value={user.lat}/>
        </div>
        <div className="form-group">
          <input name="discount" placeholder="Discount" onChange={handleInputChange} value={user.lng}/>
        </div>
        <div className="form-group">
          <input name="carnivalShare" placeholder="Carnival Share" onChange={handleInputChange} value={user.phone}/>
        </div>
        <div className="form-group">
          <input name="execFolio" placeholder="Exec. Folio" onChange={handleInputChange} value={user.id}/>
        </div>
        <div className="form-group">
          <input name="mealCharge" placeholder="Meal Charge" onChange={handleInputChange} value={user.website}/>
        </div>
        <div className="form-group">
          <input name="officeSup" placeholder="Office Supplies" onChange={handleInputChange} value={user.name}/>
        </div>
        <div className="form-group">
          <input name="cashPaid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={user.street}/>
        </div>
        <div className="form-group">
          <input name="cashAdv" placeholder="Cash Advance" onChange={handleInputChange} value={user.city}/>
        </div>
        <div className="form-group">
          <input name="paroleFee" placeholder="Parole Fee" onChange={handleInputChange} value={user.zipcode}/>
        </div>
        <div className="form-group-status">
          <label htmlFor="statusPaid">Status</label>
          <select name="statusPaid" onChange={handleInputChange} value={user.username}>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="unpaid">Unpaid</option>
          </select>
        </div>
      </form>
    );
  };
  
  export default EditModal;
  