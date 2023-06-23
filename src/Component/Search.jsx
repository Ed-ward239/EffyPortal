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
            '& > :not(style)': { m: 0, width: '22.5ch' },
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