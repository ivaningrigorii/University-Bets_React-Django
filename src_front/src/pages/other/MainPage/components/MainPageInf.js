import React, { Component } from 'react';

import logoUrl from '../images/label.svg';
import './MainPageInf.css';
import CreatePollButton from './CreatePollButton';
import { Typography, Container, } from '@mui/material';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';

let theme = createTheme();
theme = responsiveFontSizes(theme);


const MainPageInf = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{minHeight: "80vh", }}>
        <Typography color=" #ef5b7f " variant="h3"
          sx={{ mt: "40vh", }} textAlign="center"
          justifyContent="center">
          <b>Ставки на спорт</b>
        </Typography>
        <CreatePollButton />
      </Container>
    </ThemeProvider>
  );
}
export default MainPageInf;