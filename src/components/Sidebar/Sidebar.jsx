import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import LogOutButton from '../LogOutButton/LogOutButton';

// MUI Imports
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Avatar from '@mui/material/Avatar';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import Button from '@mui/material/Button';
// import BasicSpeedDial from './BasicSpeedDial';


// type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function Sidebar() {
    const history = useHistory();

    const user = useSelector(store => store.user);

    const [state, setState] = React.useState({
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event.type === 'keydown' &&
            ((event.key === 'Tab' || event.key === 'Shift'))
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    // Sidebar List Content
    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            {/* User Info and Logout/Register */}
            <List>
                <ListItem key={user.username} disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Avatar src={user.avatarUrl} />
                        </ListItemIcon>
                        <ListItemText primary={user.username} />
                    </ListItemButton>
                </ListItem>
            </List>
            {/* If no user is logged in, show these links */}
            {!user.id && (
                // If there's no user, show login/registration links
                <ListItem key="login" >
                    <ListItemButton>
                        <Link className="navLink" to="/login">
                            Login / Register
                        </Link>
                    </ListItemButton>
                </ListItem>
            )}

            {/* If a user is logged in, show these links */}
            {user.id && (
                <ListItem key="logout" >
                    <ListItemButton>
                        <LogOutButton className="navLink" />
                    </ListItemButton>
                </ListItem>
            )}
            <Divider />
            <ListItem key="Home" >
                <ListItemButton onClick={() => history.push('/user')}>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <List>

                {/* Conditionally Renders Admin Links */}
            </List>
            {user.auth_level === 5 && (
                <>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemText primary="Admin" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/create-tournament')}>
                                <ListItemText primary="Create Tournament" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link2" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-tournaments')}>
                                <ListItemText primary="Manage Tournaments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link3" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/add-team')}>
                                <ListItemText primary="Add Team" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link4" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-teams')}>
                                <ListItemText primary="Manage Teams" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
        </Box>
    );



    return (
        <div>
            {(['']).map((anchor) => (
                <React.Fragment key={anchor}>
                    <Box
                        sx={{
                            width: 60,
                            height: 60,
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'absolute',
                            bottom: 125,
                            right: 16,
                            backgroundColor: 'primary.main',
                            color: 'common.white',
                            boxShadow: 3,
                            '&:active': {
                                backgroundColor: 'primary.dark',
                            },
                        }}
                        onClick={toggleDrawer(anchor, true)}
                    >
                        <MenuIcon />
                    </Box>
                    <Drawer
                        anchor='right'
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        {list(anchor)}
                    </Drawer>
                </React.Fragment>
            ))}
        </div>
    );
}
