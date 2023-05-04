import React, { useState } from 'react';
import { Box, Stack, TextField, Grid, } from '@mui/material';
import { useStyles, ButtonInFormAuth } from '../../styles';
import TextBoxPassword from '../../_custom_mui/TextBoxPassword';
import RegistrationValidation from './RegistrationValidation';
import routes from '../../../../../routes';

const regValidation = new RegistrationValidation();

const Registration = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const classes = useStyles();

    const handleChange = () => {
        regValidation.isValid(username, password, password2, email);
    }

    return (
        <Grid container direction="column" alignItems="center">
            <Box className={classes.box_elements2}>
                <Box className={classes.box_element_with_text}>
                    <p className={classes.text_INPUT}><b><br />Регистрация</b></p>
                </Box>
                <Stack className={classes.form_elements} spacing={2}>

                    <TextField label="Придумайте логин" className={classes.textbox_elements}
                        onChange={(event) => setUsername(event.target.value)} size='small' />

                    <TextField label="Введите Вашу почту" className={classes.textbox_elements}
                        onChange={(event) => setEmail(event.target.value)} size='small' />

                    <TextBoxPassword label={"Пароль"}
                        setPassword={setPassword} size={"small"}
                         style={classes.textbox_elements} />
                    <TextBoxPassword label={"Повторите пароль"}
                        setPassword={setPassword2} size={"small"}
                         style={classes.textbox_elements} />

                    <ButtonInFormAuth onClick={handleChange}>
                        Регистрация
                    </ButtonInFormAuth>
                </Stack>
            </Box>
            <a href={routes.auth.login}>Вход</a>
            <Box className={classes.input_down} />
        </Grid>
    );
}
export default Registration;