import { Component, useEffect } from "react";
import Button from '@mui/material/Button';
import routes from "../../../../routes";

const ButtonLogin = () => {
    const enter = "Войти";
    const href = routes.auth.login;
    const properties_button = {
        my: 1, color: 'white',
        backgroundColor: "#a31545",
        display: 'block'
    };

    return (
            <Button id='ButtonLogin' 
            size="small"
            key={enter} 
            sx={properties_button} 
            variant="contained" 
            href={href}>
                {enter}
            </Button>
    );
}
export default ButtonLogin;