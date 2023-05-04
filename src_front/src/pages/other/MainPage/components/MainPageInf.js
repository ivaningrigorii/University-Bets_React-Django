import React, { Component } from 'react';

import logoUrl from '../images/label.svg';
import logoPen from '../images/pen.jpg';
import logoQuestion from '../images/question.png';
import logoAnalze from '../images/analize.png';
import './MainPageInf.css';
import CreatePollButton from './CreatePollButton';
import { Typography, Box, Container, } from '@mui/material';
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
          <b>Умный конструктор опросов</b>
        </Typography>

        <div className="main-page-img">
          <img src={logoUrl} alt="УКМ" />
        </div>
        <CreatePollButton />
      </Container>
    </ThemeProvider>

  );
}
export default MainPageInf;