import { ThemeProvider } from "@emotion/react";
import React from "react";
import Footer from "../../../../components/Footer/Footer";
import Header from "../../../../components/Header/Header";
import { theme, useStyles } from "../styles";
import Registration from "./components/Registration";

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
};
export default RegistrationPage;
