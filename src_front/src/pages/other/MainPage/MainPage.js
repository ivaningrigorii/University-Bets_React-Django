import { Box } from "@mui/material";
import React from "react";
import Footer from "../../../components/Footer/Footer";
import Header from "../../../components/Header/Header";
import MainPageInf from "./components/MainPageInf";
import "./styles.css";

const MainPage = () => {
  document.title = "Ставки на спорт";
  return (
    <Box>
      <Header />
      <MainPageInf />
      <Footer />
    </Box>
  );
};
export default MainPage;
