import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function Text() {

  const [text, setText] = useState('');

  const handleChange = (event) => {
    setText(event.target.value);
    event.preventDefault();
  };

  return (

    <Box sx={{
      marginTop: 1, marginLeft: 5, marginRight: 5,flexGrow: 1, width: '95%',
      maxWidth: '100%'
    }}>
      <TextField
        name="text"
        id="text"
        label="Ответ"
        style={{ margin: 20 }}
        helperText="Введите текст ответа"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={text}
        onChange={handleChange}
        inputProps={{ maxLength: 100, ref: (input) => input && input.focus() }}
      />
    </Box>
  );
}

export default Text;