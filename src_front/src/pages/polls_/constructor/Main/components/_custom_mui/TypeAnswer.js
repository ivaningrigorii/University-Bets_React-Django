import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

  function TypeAnswer({ defaultTrue = false, trueLabel = 'True', falseLabel = 'False' }) {
    const [one_answer_with_a_choice, setValue] = useState(defaultTrue);
  
    const handleChange = (event) => {
      setValue(event.target.checked);
    };
  
    return (
      <div>
         <Box sx={{
       flexGrow: 1, width: '95%',
      maxWidth: '100%'
    }}>
      <Typography  >Один вариант ответа</Typography>
        <Switch
           id="one_answer_with_a_choice"
          
          checked={one_answer_with_a_choice}
          onChange={handleChange}
          color="primary"
          inputProps={{ 'aria-label': 'true false switch' }}
        />
        <div>{one_answer_with_a_choice ? trueLabel : falseLabel}</div>
        </Box>
      </div>
    );
  }
  export default TypeAnswer;