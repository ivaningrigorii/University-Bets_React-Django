import { makeStyles } from "@mui/styles";
import { createTheme, Button } from "@mui/material";
import { styled } from "@mui/styles";

const useStyles = makeStyles({
  body_pages: {
    background:
      "linear-gradient(41deg, rgba(242,227,185,1) 15%, rgba(240,180,203,1) 69%)",
  },

  box_elements: {
    marginTop: "10%",
    width: 250,
    backgroundColor: " #f095a9 ",
    borderRadius: "25px",
    minHeight: "300px",
  },

  box_elements2: {
    marginTop: "10%",
    width: 250,
    backgroundColor: " #f095a9 ",
    borderRadius: "25px",
    minHeight: "360px",
  },

  box_element_with_text: {
    background: "#6666ff",
    borderTopLeftRadius: "25px",
    borderTopRightRadius: "25px",
    minHeight: "48px",
    color: "white",
    textAlign: "center",
  },

  text_INPUT: {},

  form_elements: {
    backgroundColor: " #f095a9 ",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "10%",
  },

  textbox_elements: {
    backgroundColor: "#f2f2f2",
    borderRadius: "5px",
    border: 0,
  },

  input_down: {
    marginTop: "20%",
  },
});

const theme = createTheme({
  typography: {
    fontFamily: "Roboto",
  },
});

export { useStyles, theme };

const ButtonInFormAuth = styled(Button)({
  background: "linear-gradient(45deg, #ccffff 10%, #e6ccff 30%)",
  border: 0,

  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "black",
  padding: "0 30px",
});

export { ButtonInFormAuth };
