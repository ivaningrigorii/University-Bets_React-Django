import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

  function Correct({ defaultTrue = false, trueLabel = 'Да', falseLabel = 'Нет' }) {
    const [сorrect, setСorrect] = useState(defaultTrue);
  
    const handleChange = (event) => {
        setСorrect(event.target.checked);
    };
  
    return (
      <div>
         <Box sx={{mt:1,
       flexGrow: 1, width: '95%',
      maxWidth: '100%'
    }}>
      <Typography>Правильный ответ</Typography>
        <Switch
           id="сorrect"        
          checked={сorrect}
          onChange={handleChange}
          color="primary"
          inputProps={{ 'aria-label': 'true false switch' }}
        />
        <div>{сorrect ? trueLabel : falseLabel}</div>
        </Box>
      </div>
    );
  }
  export default Correct;