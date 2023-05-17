import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import './EditDelete.css';

function EditDelete()
{
    return (
        <div className='editDelete'>
            <IconButton className='deleteBtn' color='warning'><DeleteForeverIcon/></IconButton>
            <IconButton className='editBtn'><EditIcon/></IconButton>
        </div>
    )
}
export default EditDelete;