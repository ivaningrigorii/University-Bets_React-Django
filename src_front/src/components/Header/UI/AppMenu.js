import logoUrl from '../images/label.svg';
import ButtonLoginSelecter from '../components/ButtonLoginComponents/ButtonLoginSelecter';
import AuthServices from '../../../pages/personal/Auth/AuthServices';
import routes from '../../../routes';
import { AppBar, Box, Toolbar, Button, Hidden, MenuItem, } from '@mui/material';
import React, { useState, useEffect } from 'react';
import ButtonMenuPolls from '../components/Menu/Polls/ButtonMenuPolls';
import { KeyboardArrowDown, } from '@mui/icons-material';
import StyledMenu from '../components/Menu/MenuButton';

const auths = new AuthServices();

let input_enter = "Войти";

function AppMenu() {
  const [setAnchorElNav] = useState(null);
  const [but_log, setButLog] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickImg = () => {
    window.location.replace(routes.home);
  };

  useEffect(() => {
    input_enter = auths.findAuthTokens() ? "Выйти" : "Войти";
    return setButLog(<ButtonLoginSelecter enter={input_enter} />);
  }, [input_enter]);

  return (
    <AppBar sx={{ bgcolor: "white" }}>
      <Toolbar variant='dences'>
        <Box sx={{ cursor: 'pointer' }}>
          <img src={logoUrl} width={130} height={30} onClick={handleClickImg} />
        </Box>
        <Box sx={{ flexGrow: 1, width: 40, height: 30 }}></Box>
        <Hidden mdDown>
          <Box sx={{ height: 50, justifyContent: 'space-between', flexWrap: 'wrap', flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href={routes.home}>Главная</Button>
            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href="#">Ставки</Button>
            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href="#">Команды</Button>
            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href={routes.profile}>Профиль</Button>
            {but_log}
          </Box>
        </Hidden>
        <Hidden mdUp>
          <Button
            id="demo-customized-button"
            aria-controls={open ? 'demo-customized-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            disableElevation
            onClick={handleClick}
            endIcon={<KeyboardArrowDown />}
          >
            Меню
          </Button>
          <StyledMenu
            id="demo-customized-menu"
            MenuListProps={{
              'aria-labelledby': 'demo-customized-button',
            }}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href={routes.home}>Главная</Button>

            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href="#">Ставки</Button>
            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href="#">Команды</Button>

            <Button sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
              href={routes.profile}>Профиль</Button>
            {but_log}
          </StyledMenu>
        </Hidden>

      </Toolbar>
    </AppBar>
  );
}
export default AppMenu;
