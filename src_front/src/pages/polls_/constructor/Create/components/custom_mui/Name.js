import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Name() {

  const [name, setName] = useState('');

  const handleChange = (event) => {
    setName(event.target.value);
    event.preventDefault();
  };

  return (

    <Box sx={{
      marginTop: 1, flexGrow: 1,
      maxWidth: '100%'
    }}>
      <TextField
        name="name"
        id="name"
        label="Название"
        style={{ mt: "10px", }}
        helperText="Введите название опроса"
        fullWidth
        margin="normal"
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={name}
        onChange={handleChange}
        inputProps={{ maxLength: 100, ref: (input) => input && input.focus() }}
      />
    </Box>
  );
}

export default Name;