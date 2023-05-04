import Header from "../../../components/Header/Header";
import React, { Component, useState } from 'react';
import Footer from "../../../components/Footer/Footer";
import routes from "../../../routes";
import AuthServices from "../../personal/Auth/AuthServices";
import { useEffect, } from "react";
import { useParams, } from 'react-router';
import { makeStyles } from "@mui/styles";
import ConstructorServices from "./AnServices";
import { Box } from "@mui/material";
import AnalyticsCard from "./components/AnalyticsCard";

const auths = new AuthServices();
const survises = new ConstructorServices();

const AnalyticsPage = () => {
    document.title = "Аналитика опроса";
    const params = useParams();
    const classes = main();
    console.log(params.poll);
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
                    <AnalyticsCard id={params.poll} />
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

export default AnalyticsPage;
