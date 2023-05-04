import React, { useState, useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';


const StartTime = ({start_time, setStartTime, }) => {
  const today = new Date();
  today.setDate(today.getDate());

  const handleInputChange = useCallback(event => {
    setStartTime(event.target.value)
  }, [setStartTime]);

  return (
    <TextField type="datetime-local" id="start_time" sx={{ m: 1, minWidth: 120 }}
      size='small'
      helperText="Введите дату открытия опроса"
      value={start_time}
      onChange={handleInputChange}
      inputProps={{ min: today.toISOString().slice(0, 16), ref: (input) => input && input.focus() }}
    />
  );
}
export default StartTime;