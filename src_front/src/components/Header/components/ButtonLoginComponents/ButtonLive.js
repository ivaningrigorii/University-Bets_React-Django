import { Component, useEffect } from "react";
import Button from '@mui/material/Button';
import routes from "../../../../routes";

const ButtonLive = () => {
    const enter = "Выйти";
    const href = routes.auth.logout;
    const properties_button = { 
        my: 1, color: 'blue', 
        backgroundColor: "white", 
        display: 'block' 
    };

    return (
        <Button id='ButtonLogin' 
        key={enter} 
        sx={properties_button} 
        variant="contained" 
        href={href} 
        size="small">
            {enter}
        </Button>
    );
}
export default ButtonLive;