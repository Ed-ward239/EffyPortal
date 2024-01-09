import React, { useState, useEffect } from "react";
import "./Modal.css";
import { useUsername } from "./useUsername";

const EditModal = (editModal) => {
    const editorName = useUsername();
    const [row, setRow] = useState(editModal.currentUser);
  
    useEffect(() => {
      setRow(editModal.currentUser);
    }, [editModal]);
  
    const handleInputChange = (e) => {
      const { ship_name, voyage_num, date, effy_share, status_paid, editor, rev_ss, rev_cc,
              eu_vat, carnival_share,  office_supp, discounts, exec_folio, ss_fee, cc_fee, 
              meal_charge, parole_fee, cash_adv, cash_paid, value } = e.target;
      setRow({ ...row, [ship_name]: value, [voyage_num]: value,
              [date]: value, [effy_share]: value, [status_paid]: value, [editor]: editorName, [rev_ss]: value,
              [rev_cc]: value, [ss_fee]: value, [cc_fee]: value, [eu_vat]: value, [discounts]: value,
              [carnival_share]: value, [exec_folio]: value, [meal_charge]: value, [office_supp]: value,
              [parole_fee]: value, [cash_adv]: value, [cash_paid]: value });
    };
  
    return (
      <>
        <form
          class="inputForm"
          onSubmit={(e) => {
            e.preventDefault();
            editModal.updateUser(row.voyage_num, row);
          }}
        >
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="ship_name"
              label="Ship Name"
              onChange={handleInputChange}
              value={row.ship_name}
            />
            <label class="floating-label">Ship Name</label>
          </div>
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="voyage_num"
              label="Voyage #"
              onChange={handleInputChange}
              value={row.voyage_num}
            />
            <label class="floating-label">Voyage #</label>
          </div>
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="date"
              label="Date (mm/dd/yyyy)"
              onChange={handleInputChange}
              value={row.date}
            />
            <label class="floating-label">Date</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="effy_share"
              label="Effy Share"
              onChange={handleInputChange}
              value={row.effy_share}
            />
            <label class="floating-label">Effy Share</label>
          </div>
          <div class="txtInputGrp">
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="editor"
              label="Editor"
              value={row.editor}
            />
            <label class="floating-label">Editor</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="rev_ss"
              label="Revenue S&S"
              onChange={handleInputChange}
              value={row.rev_ss}
            />
            <label class="floating-label">Revenue S&S</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="rev_cc"
              label="Revenue CC"
              onChange={handleInputChange}
              value={row.rev_cc}
            />
            <label class="floating-label">Revenue CC</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="ss_fee"
              label="S&S Fee"
              onChange={handleInputChange}
              value={row.ss_fee}
            />
            <label class="floating-label">S&S Fee</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="cc_fee"
              label="CC Fee"
              onChange={handleInputChange}
              value={row.cc_fee}
            />
            <label class="floating-label">CC Fee</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="eu_vat"
              label="EU VAT"
              onChange={handleInputChange}
              value={row.eu_vat}
            />
            <label class="floating-label">EU VAT</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="discounts"
              label="Discounts"
              onChange={handleInputChange}
              value={row.discounts}
            />
            <label class="floating-label">Discounts</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="carnival_share"
              label="Carnival Share"
              onChange={handleInputChange}
              value={row.carnival_share}
            />
            <label class="floating-label">Carnival Share</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="exec_folio"
              label="Exec. Folio"
              onChange={handleInputChange}
              value={row.exec_folio}
            />
            <label class="floating-label">Exec. Folio</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="meal_charge"
              label="Meal Charge"
              onChange={handleInputChange}
              value={row.meal_charge}
            />
            <label class="floating-label">Meal Charge</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="office_supp"
              label="Office Supplies"
              onChange={handleInputChange}
              value={row.office_supp}
            />
            <label class="floating-label">Office Supplies</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="cash_paid"
              label="Cash Paid Onboard"
              onChange={handleInputChange}
              value={row.cash_paid}
            />
            <label class="floating-label">Cash Paid Onboard</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="cash_adv"
              label="Cash Advance"
              onChange={handleInputChange}
              value={row.cash_adv}
            />
            <label class="floating-label">Cash Advance</label>
          </div>
          <div class="txtInputGrp input-group">
            <span class="inputGrp">
              <div class="dollarSign">-$</div>
            </span>
            <input
              class="inputTxt"
              type="text"
              placeholder=" "
              name="parole_fee"
              label="Parole Fee"
              onChange={handleInputChange}
              value={row.parole_fee}
            />
            <label class="floating-label">Parole Fee</label>
          </div>
          <div class="txtInputGrp">
            <select
              class="inputSelect"
              onChange={handleInputChange}
              value={row.statusPaid}
            >
              <option value=""></option>
              <option value="1">Unpaid</option>
              <option value="2">Pending</option>
              <option value="3">Paid</option>
            </select>
            <label class="floating-label">Status</label>
          </div>
        </form>
        {/*    <form 
          onSubmit={e => {
            e.preventDefault()
            if(!row.name) return
            editModal.EditModal(row)
            setRow(initFormState)
          }}>
          <div className="inputs">
            <input name="ship_name" placeholder="Ship Name" onChange={handleInputChange} value={row.ship_name} />
            <input name="voyage_num" placeholder="Voyage #" onChange={handleInputChange} value={row.voyage_num} />
            <input name="date" placeholder="Date (mm/dd/yyyy)" onChange={handleInputChange} value={row.date} />
            <input name="effy_share" placeholder="Effy Share" onChange={handleInputChange} value={row.effy_share} />
            <input name="editor" placeholder="Edited By" onChange={handleInputChange} value={row.editor} readOnly /> 
            <input name="rev_ss" placeholder="Revenue S&S" onChange={handleInputChange} value={row.rev_ss} /> 
            <input name="rev_cc" placeholder="Revenue CC" onChange={handleInputChange} value={row.rev_cc} />
            <input name="ss_fee" placeholder="S&S Fee" onChange={handleInputChange} value={row.ss_fee} />
            <input name="cc_fee" placeholder="CC Fee" onChange={handleInputChange} value={row.cc_fee} />
            <input name="euRev" placeholder="EU VAT" onChange={handleInputChange} value={row.eu_vat} />
            <input name="discounts" placeholder="Discount" onChange={handleInputChange} value={row.discounts} />
            <input name="carnival_share" placeholder="Carnival Share" onChange={handleInputChange} value={row.carnival_share} />          
            <input name="exec_folio" placeholder="Exec. Folio" onChange={handleInputChange} value={row.exec_folio} />          
            <input name="meal_charge" placeholder="Meal Charge" onChange={handleInputChange} value={row.meal_charge} />          
            <input name="office_supp" placeholder="Office Supplies" onChange={handleInputChange} value={row.office_supp} />          
            <input name="cash_paid" placeholder="Cash Paid on Board" onChange={handleInputChange} value={row.cash_paid} />          
            <input name="cash_adv" placeholder="Cash Advance" onChange={handleInputChange} value={row.cash_adv} />          
            <input name="parole_fee" placeholder="Parole Fee" onChange={handleInputChange} value={row.parole_fee} />
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
            <button className="submitBtn">Submit</button>
          </div>
        </form>*/}
      </>
    );
  };
  
  export default EditModal;
  