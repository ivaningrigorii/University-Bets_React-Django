import Header from "../../../../components/Header/Header";
import React, { Component, useEffect, useState } from 'react';
import { makeStyles } from "@mui/styles";
import Footer from "../../../../components/Footer/Footer";
import CreateSelecter from "./components/CreateSelecter";
import AuthServices from "../../../personal/Auth/AuthServices";
import { Box } from "@mui/material";
import routes from "../../../../routes";

import { createTheme, ThemeProvider, } from "@mui/material/styles";
const auths = new AuthServices();
const useStyles = makeStyles({
    body_pages: {
        background: "linear-gradient(41deg, " + 
        "rgba(151,131,233,1) 15%, " +
        "rgba(101,166,167,1) 46%, " +
        "rgba(177,80,88,1) 67%)",
    },
});
  

const CreatePage = () => {
    const classes = useStyles();
    document.title = "Создание опроса";
    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <body className={classes.body_pages}>
                <Header />
                <CreateSelecter />
                <Footer />
            </body>
        );
    }
}
export default CreatePage;


