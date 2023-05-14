import React from 'react';

import { Container, Typography, } from '@mui/material';
import {
  ThemeProvider,
  createTheme,
  responsiveFontSizes,
} from '@mui/material/styles';
import CreatePollButton from './CreatePollButton';
import './MainPageInf.css';

let theme = createTheme();
theme = responsiveFontSizes(theme);

const MainPageInf = () => {
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ minHeight: "80vh" }}>
        <Typography
          color=" #ef5b7f "
          variant="h3"
          sx={{ mt: "40vh" }}
          textAlign="center"
          justifyContent="center"
        >
          <b>Ставки на спорт</b>
        </Typography>
        <CreatePollButton />
      </Container>
    </ThemeProvider>
  );
};
export default MainPageInf;
