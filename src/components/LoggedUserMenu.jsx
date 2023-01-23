import * as React from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import Logout from '@mui/icons-material/Logout';
import Button from "@mui/material/Button";
import {deepPurple} from "@mui/material/colors";
import {setActiveOffer} from "../redux/activeOfferSlice";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../redux/loggedUserSlice";
import {setCurrentSite} from "../redux/currentSiteControllerSlice";
import {setFilterByUser} from "../redux/filterSlice";



function LoggedUserMenu(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const currentSiteController = useSelector(state => state.currentSiteController);
    const loggedUser = useSelector(state => state.loggedUser);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        dispatch(logoutUser());
        localStorage.clear();
    }
    const handleMyOffers = () => {
        dispatch(setFilterByUser(loggedUser.loggedUser.userID));
    }

    const handleAddListing = () => {
        dispatch(setCurrentSite(currentSiteController.availableSites.AddListing));
    }
    return (
        <React.Fragment>
            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                <Button variant="contained"
                        style={{
                            backgroundColor: "#FCA311",
                        }}
                        onClick={handleAddListing}
                        data-testid="add-listing-button">
                    Dodaj ogłoszenie
                </Button>
                <Tooltip title="Account settings">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ bgcolor: deepPurple[500] }}>{props.name.charAt(0)}</Avatar>
                    </IconButton>
                </Tooltip>
            </Box>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem>
                    <Avatar sx={{ bgcolor: deepPurple[500] }}></Avatar> {props.name}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleMyOffers}>
                    <ListItemIcon>
                        <PersonIcon fontSize="small" />
                    </ListItemIcon>
                    Moje ogłoszenia
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Wyloguj się
                </MenuItem>
            </Menu>
        </React.Fragment>
    );
}

export default LoggedUserMenu;