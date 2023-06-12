import React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

function Search(){
    return (
      <>
        <Box
          className='searchBox'
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="on"
        >
          <TextField label="Search Voyage#" variant="outlined" />
        </Box>
      </>

      );
}
export default Search;