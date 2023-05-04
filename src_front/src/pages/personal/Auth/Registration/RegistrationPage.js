import React from 'react';
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import Registration from "./components/Registration"
import { useStyles, theme } from '../styles';
import { ThemeProvider } from '@emotion/react';

const RegistrationPage = () => {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <body className={classes.body_pages}>
                <Header />
                <Registration />
                <Footer />
            </body>
        </ThemeProvider>
    );
}
export default RegistrationPage;