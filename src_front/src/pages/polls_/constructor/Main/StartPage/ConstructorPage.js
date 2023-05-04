import Header from "../../../../../components/Header/Header";
import React, { Component, useState } from 'react';
import Footer from "../../../../../components/Footer/Footer";
import routes from "../../../../../routes";
import AuthServices from "../../../../personal/Auth/AuthServices";
import ConstructorTabs from "./ConstructorTabs";
import { useEffect, } from "react";
import { useParams, } from 'react-router';
import { makeStyles } from "@mui/styles";
import ConstructorServices from "../ConstructorServices";
import { Box } from "@mui/material";

const auths = new AuthServices();
const survises = new ConstructorServices();

const ConsructorPage = () => {
    document.title = "Конструктор опроса";
    const params = useParams();
    const classes = main();

    if (!params.poll) {
        return window.location.replace(routes.home);
    }
    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    }
    else {
        return (
            <Box className={classes.body_style}>
                <Header />
                {params &&
                    <ConstructorTabs poll={params.poll} />
                }
                <Footer />
            </Box>
        );
    }
}

const main = makeStyles({
    body_style: {
        background: 'linear-gradient(45deg, #8778eb 30%, #78a6eb 90%)',
    }
  });

export default ConsructorPage;

