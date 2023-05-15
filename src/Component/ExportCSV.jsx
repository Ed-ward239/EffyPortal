import React from 'react';
import './ExportCSV.css';
import { BiDownload } from 'react-icons/bi';
import Button from '@mui/material/Button';

function ExportCSV(){
    return(
        <>
            <Button className="exportBtn" variant="outlined" startIcon={<BiDownload />}>Export</Button>
        </>
    )
}
export default ExportCSV;