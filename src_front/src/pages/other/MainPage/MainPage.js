import Header from "../../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../../components/Footer/Footer";
import MainPageInf from "./components/MainPageInf";
import './styles.css';
import { Helmet } from 'react-helmet-async';
import { Box } from "@mui/material";

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            surveys: [],
        };
    }

    render() {
        return (

            <Box>
                <Helmet>
                    <link id="favicon" rel="icon" href="label.bmp" type="bmp" />
                </Helmet>

                <Header />
                <MainPageInf />
                <Footer />
            </Box>
        );
    }
}
export default MainPage;