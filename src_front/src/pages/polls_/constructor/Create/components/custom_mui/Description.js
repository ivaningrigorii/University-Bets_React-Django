import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Description() {

  const [description, setDescription] = useState('');

  const handleChange = (event) => {
    setDescription(event.target.value);
    event.preventDefault();
  };


  return (

    <Box sx={{
      marginTop: 1, flexGrow: 1,
      maxWidth: '100%',
    }}>
      <TextField
        id="description"
        name="description"
        label="Описание"
        style={{ mt: "10px", }}
        size="small"
        helperText="Введите краткое описание"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={description}
        onChange={handleChange}
        inputProps={{ maxLength: 400, ref: (input) => input && input.focus() }}
      />
    </Box>
  );
}

export default Description;