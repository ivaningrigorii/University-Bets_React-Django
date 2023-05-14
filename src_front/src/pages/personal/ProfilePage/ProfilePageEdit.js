import { Box } from "@mui/material";
import React from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import routes from "../../../routes";
import AuthServices from "../Auth/AuthServices";
import ProfileEdit from "./components/ProfileEdit";
const auths = new AuthServices();

const ProfilePageEdit = () => {
  document.title = "Профиль";

  if (!auths.findAuthTokens()) {
    return window.location.replace(routes.auth.login);
  } else {
    return (
      <Box>
        <Header />
        <ProfileEdit />
        <Footer />
      </Box>
    );
  }
};
export default ProfilePageEdit;
