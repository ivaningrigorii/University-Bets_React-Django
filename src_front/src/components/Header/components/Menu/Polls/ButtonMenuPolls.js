import * as React from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StyledMenu from '../MenuButton';
import routes from '../../../../../routes';

export default function ButtonMenuPolls() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const openCreatePoll = () => window.location.replace(routes.polls.create);
    const openCatalogsPolls = () => window.location.replace(routes.polls.cats.default);

    return (
        <div>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                sx={{ color: 'black', display: 'block', height: 30, my: 1, }}
                disableElevation
                onClick={handleClick}>
                Опросы
            </Button>

            <StyledMenu id="demo-customized-menu"
                MenuListProps={{ 'aria-labelledby': 'demo-customized-button', }}
                anchorEl={anchorEl} open={open} onClose={handleClose}>

                <MenuItem onClick={openCreatePoll} disableRipple>
                    <EditIcon /> Создать опрос
                </MenuItem>
                <MenuItem onClick={openCatalogsPolls} disableRipple>
                    <FileCopyIcon /> Каталоги опросов
                </MenuItem>

            </StyledMenu>
        </div>
    );
}