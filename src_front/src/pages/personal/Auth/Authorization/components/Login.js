import React, { useState } from 'react';
import { Box, Stack, TextField, Grid, } from '@mui/material';
import { useStyles, ButtonInFormAuth } from '../../styles';
import TextBoxPassword from '../../_custom_mui/TextBoxPassword';
import LoginValidation from './LoginValidation';
import routes from '../../../../../routes';

const loginValidation = new LoginValidation();

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const classes = useStyles();

  const handleChange = () => {
    loginValidation.isValid(username, password);
  }

  return (
    <Grid container direction="column" alignItems="center">
      <Box className={classes.box_elements}>
        <Box className={classes.box_element_with_text}>
          <p className={classes.text_INPUT}><b><br />ВОЙТИ</b></p>
        </Box>
        <Stack className={classes.form_elements} spacing={2}>
          <TextField label="Логин" className={classes.textbox_elements}
            onChange={(event) => setUsername(event.target.value)} />
          <TextBoxPassword setPassword={setPassword} style={classes.textbox_elements} 
            size={"medium"} label={"Пароль"}/>
          <ButtonInFormAuth onClick={handleChange}>Войти</ButtonInFormAuth>
        </Stack>
      </Box>
      <a href={routes.auth.registration}>Регистрация</a>
      <Box className={classes.input_down}/>
    </Grid>
  );
}
export default Login;