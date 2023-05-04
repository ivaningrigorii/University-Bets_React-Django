import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';


function TextQuestion() {

  const [text_question, setTextQuestion] = useState('');

  const handleChange = (event) => {
    setTextQuestion(event.target.value);
    event.preventDefault();
  };

  return (

    <Box sx={{
      marginTop: 1, flexGrow: 1, width: '95%',
      maxWidth: '100%'
    }}>
      <TextField
        name="text_question"
        id="text_question"
        label="Вопрос"
        style={{ margin: 20 }}
        helperText="Введите текст вопроса"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={text_question}
        onChange={handleChange}
        inputProps={{ maxLength: 100, ref: (input) => input && input.focus() }}
      />
    </Box>
  );
}

export default TextQuestion;