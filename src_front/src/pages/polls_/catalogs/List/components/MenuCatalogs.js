import * as React from 'react';
import { Box, Grid, IconButton, Menu, MenuItem, Toolbar, } from '@mui/material';
import { makeStyles, } from '@mui/styles';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import routes from '../../../../../routes';
import { Stack } from '@mui/system';


const TYPES_CATALOGS = [
    { title: 'Созданные опросы', href: routes.polls.cats.default, },
    { title: 'Пройденные опросы', href: "#" },
];
const ITEM_HEIGHT = 48;


const useStyles = makeStyles({
    stack_style: {
        marginTop: '5%',
    },
    label_style: {
        color: ' #eceaec ',
    },
});


const MenuCatalogs = ({ titleSelectedOption }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();

    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const handleSelect = () => {
        window.location.reload(TYPES_CATALOGS.href);
    };

    return (
        <Box>
            <label className={classes.label_style}>{titleSelectedOption}</label>
            <IconButton
                aria-label="more"
                id="long-button"
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick} >

                <MoreVertIcon />

            </IconButton>


            <Menu
                id="long-menu"
                MenuListProps={{ 'aria-labelledby': 'long-button', }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '20ch',
                    },
                }}>

                {TYPES_CATALOGS.map((option) => (
                    <MenuItem key={option.title} value={option.title}
                        selected={option === titleSelectedOption}
                        onClick={handleSelect}>

                        {option.title}

                    </MenuItem>
                ))}

            </Menu>
        </Box>
    );
}

export default MenuCatalogs;