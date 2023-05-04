import React, { useState, useCallback, useEffect } from 'react';
import { TextField } from '@mui/material';


 const TimePassing = ({time_passing, setTimePassing, }) => {

  const handleInputChange = useCallback(event => {
    setTimePassing(event.target.value)
  }, [time_passing]);

  return (
    <TextField type="number" id="time_passing" sx={{ m: 1, minWidth: 120 }}
      size='small'
      label="Время прохождения в минутах"
      helperText="Введите длительность прохождения"
      value={time_passing}
      onChange={handleInputChange}
      inputProps={{ min: 1, ref: (input) => input && input.focus() }}
    />
  );
}
export default TimePassing;