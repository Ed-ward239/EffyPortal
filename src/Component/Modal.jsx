import React, { useState } from "react";
import UploadPDF from '../Component/UploadPDF_Car';
import "./Modal.css";
import { Button } from "@mui/material";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Chip from '@mui/material/Chip';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { WelcomeName } from "./WelcomeName";

export const Modal = ({ closeModal, onSubmit, defaultValue }) => {
  const [status, setStatus] = React.useState("");
  const [errors, setErrors] = useState("");

  const [formState, setFormState] = useState(
    defaultValue || {
      page: "",
      description: "",
      status: "Pending",
    }
  );
  const validateForm = () => {
    if (formState.page && formState.description && formState.status) {
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
    setStatus(e.target.value);
    setFormState(e.target.value);
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
        <form>
        {errors && <div className="error">{`Please include: ${errors}`}</div>}
        <Box
          className='shipName'
          component="form"
          sx={{ m: 1, width: '25ch' }}
          noValidate
          autoComplete="off"
          >
          <TextField label="Ship Name" variant="outlined" />
        </Box>
        <Box
          className='voyageNum'
          component="form"
          sx={{ m: 1, width: '25ch' }}
          noValidate
          autoComplete="off"
          >
          <TextField label="Voyage#" variant="outlined" />
        </Box>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={['DatePicker']}>
            <DatePicker label="Date" />
          </DemoContainer>
        </LocalizationProvider>
        <Box
          className='effyShare'
          component="form"
          sx={{ m: 1, width: '25ch' }}
          noValidate
          autoComplete="off"
          >
          <TextField label="Effy Share" variant="outlined" />
        </Box>
        <Box sx={{ m: 1, width: '25ch' }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Status</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Status"
                  onChange={handleChange}
                  >
                  <MenuItem value={0}></MenuItem>
                  <MenuItem value={1}><Chip label="Paid" variant="outlined" color="success" size="small" /></MenuItem>
                  <MenuItem value={2}><Chip label="Pending" variant="outlined" color="warning" size="small" /></MenuItem>
                  <MenuItem value={3}><Chip label="Unpaid" variant="outlined" color="error" size="small" /></MenuItem>
                </Select>
             </FormControl>
        </Box>
        <Box
          className='editBy'
          component="form"
          sx={{ m: 1, width: '25ch' }}
          noValidate
          autoComplete="off"
          >
          <TextField 
              label="Edit By" 
              variant="outlined"           
              disabled
              id="outlined-disabled"
              defaultValue="Name" />
        </Box>

        </form>
      </div>
      
          <div className="buttons">
            <Button type="submit" className="submitBtn" variant="outlined" onClick={handleSubmit}>
                Submit
            </Button>
            <UploadPDF/>
          </div>
    </div>
  );
}
export default Modal;
