import React, { useState, useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';



const DataEnd = ({end_time, setEndTime, }) => {

  const today = new Date();
  today.setDate(today.getDate());
  const dayToEnd = new Date();
  dayToEnd.setDate(dayToEnd.getDate() + 1);

  const handleInputChange = useCallback(event => {
    setEndTime(event.target.value)
  }, [end_time]);

  return (
    <TextField type="datetime-local" id="end_time" sx={{ m: 1, minWidth: 120 }}
      size='small'
      helperText="Введите дату закрытия опроса"
      value={end_time}
      onChange={handleInputChange}
      inputProps={{ min: today.toISOString().slice(0, 16), ref: (input) => input && input.focus() }}
    />
  );
}
export default DataEnd;