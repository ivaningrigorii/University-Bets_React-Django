import { Box } from "@mui/material";
import React from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import routes from "../../../routes";
import AuthServices from "../Auth/AuthServices";
import ProfileShowMain from "./components/ProfileShowMain";
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
};
export default ProfilePage;
