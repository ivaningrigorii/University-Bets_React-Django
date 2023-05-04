import Header from "../../../components/Header/Header";
import React, { Component } from 'react';
import Footer from "../../../components/Footer/Footer";
import ProfileShowMain from './components/ProfileShowMain';
import AuthServices from "../Auth/AuthServices";
import routes from "../../../routes";
import { Box, Container,  } from "@mui/material";
import { AddBoxTwoTone } from "@mui/icons-material";
const auths = new AuthServices();

const ProfilePage = () => {
    document.title = "Профиль";

    if (!auths.findAuthTokens()) {
        return window.location.replace(routes.auth.login);
    } else {
        return (
            <Box>
                <Header />
                <ProfileShowMain />
                <Footer />
            </Box>
        );
    }
}
export default ProfilePage;