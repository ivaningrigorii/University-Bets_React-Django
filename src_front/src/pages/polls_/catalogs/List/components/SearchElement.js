import React, { useState, useCallback, } from 'react';
import { TextField, Box, InputAdornment, IconButton, } from '@mui/material';
import { Search } from '@mui/icons-material';
import { makeStyles } from '@mui/styles';
import { maxWidth, width } from '@mui/system';

const SearchElement = () => {

    const handleClickSearch = () => {
        alert("Это пока не работает (");
    }
    const handlEnterKeyUp = (e) => {
        e.which = e.which || e.keyCode;
        if (e.which == 13) {
            alert("Это пока не работает (");
        }
    }

    return (
        <Box>
            <TextField size='small' sx={{ marginLeft: '5%', backgroundColor: " #eceaec ",
                borderRadius: '5%', }}
                onKeyUp={handlEnterKeyUp}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton aria-label="toggle password visibility"
                                onClick={handleClickSearch}>
                                < Search />
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />
        </Box>
    );
}
export default SearchElement;