import { useState } from 'react';
import Switch from '@mui/material/Switch';
import { TextField, Typography } from '@mui/material';
import Box from '@mui/material/Box';

 

  function QuestionAll(props) {
  
  
    return (
      <div>
         <Box sx={{
      marginTop: 1, flexGrow: 1, width: '95%',
      maxWidth: '100%'
    }}>
      <Typography  style={{marginTop: 20, marginLeft: 20 }}>Вопросов добавлено: {props.count}</Typography>
     
        </Box>
      </div>
    );
  }
  export default QuestionAll;