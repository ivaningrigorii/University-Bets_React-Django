import Header from "../../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../../components/Footer/Footer";
import MainPageInf from "./components/MainPageInf";
import './styles.css';
import { Helmet } from 'react-helmet-async';
import { Box } from "@mui/material";

const MainPage = () => {
    document.title = "Ставки на спорт";
    return (
        <Box>
            <Header />
            <MainPageInf />
            <Footer />
        </Box>
    );

}
export default MainPage;