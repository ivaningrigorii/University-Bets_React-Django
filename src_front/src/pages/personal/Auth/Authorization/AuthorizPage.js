import React, { Component } from 'react';
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import Login from "./components/Login"
import {useStyles, theme} from '../styles';
import { ThemeProvider } from '@emotion/react';

const PollsPage = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <body className={classes.body_pages}>
                <Header />
                <Login />
                <Footer />
            </body>
        </ThemeProvider>
    );
}
export default PollsPage;