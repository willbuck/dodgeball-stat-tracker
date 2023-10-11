import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

// Bottom Navbar Imports
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import RestoreIcon from '@mui/icons-material/Restore';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import HomeIcon from '@mui/icons-material/Home';
// import CssBaseline from '@mui/material/CssBaseline';

// Sidebar Imports
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import HomeIcon from '@mui/icons-material/Home';
import EditNoteIcon from '@mui/icons-material/EditNote';
import BadgeIcon from '@mui/icons-material/Badge';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

import LogOutButton from '../Login-Register/Login/LogOutButton';





export default function BottomNavbar() {
    const [value, setValue] = useState(0);
    // const ref = React.useRef < HTMLDivElement > (null);
    // const [messages, setMessages] = React.useState(() => refreshMessages());

    // React.useEffect(() => {
    //     (ref.current as HTMLDivElement).ownerDocument.body.scrollTop = 0;
    //     setMessages(refreshMessages());
    // }, [value, setMessages]);



    // Sidebar functions
    const history = useHistory();

    const user = useSelector(store => store.user);

    const [state, setState] = useState({
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
                    <ListItemButton onClick={() => history.push('/login')}>
                        <ListItemText primary="Login/Register" />
                    </ListItemButton>
                </ListItem>
            )}

            {/* If a user is logged in, show these links */}
            {user.id && (
                <ListItem key="logout" >
                    <ListItemButton>
                        <LogOutButton
                            className="navLink"
                            onClick={() => history.push('/home')}
                        />
                    </ListItemButton>
                </ListItem>
            )}
            <Divider />
            <ListItem key="Home" >
                <ListItemButton onClick={() => history.push('/home')}>
                    <HomeIcon /><ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>
            <List>


                {/* Conditionally Renders Admin Links */}
            </List>

            {/* Team Captain Level Privileges */}
            {user.auth_level === 3 && (
                <>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemText primary="Team Captain" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin//admin/manage-teams')}>
                                <GroupsIcon /><ListItemText primary="Manage Team" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}

            {/* Tournament Admin Level Privileges */}
            {user.auth_level === 4 && (
                <>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemText primary="Tournament Admin" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-tournaments')}>
                                <EditNoteIcon /><ListItemText primary="Manage Tournaments" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}

            {/* Full Admin Level Privileges */}
            {user.auth_level === 5 && (
                <>
                    <Divider />
                    <ListItem disablePadding>
                        <ListItemText primary="Admin" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/create-tournament')}>
                                <PlaylistAddIcon /><ListItemText primary="Create Tournament" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link2" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-tournaments')}>
                                <EditNoteIcon /><ListItemText primary="Manage Tournaments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link3" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/add-team')}>
                                <GroupAddIcon /><ListItemText primary="Add Team" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link4" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-teams')}>
                                <GroupsIcon /><ListItemText primary="Manage Teams" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link5" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-users')}>
                                <BadgeIcon /><ListItemText primary="Manage Users" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
        </Box>
    );



    return (
        <>
            {(['']).map((anchor) => (
                <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                    <BottomNavigation
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction label="Notifications" component={Link} to="/" icon={<NotificationsActiveIcon />} />
                        <BottomNavigationAction label="Home" component={Link} to="/home" icon={<HomeIcon />} />
                        <BottomNavigationAction
                            label="Menu"
                            onClick={toggleDrawer(anchor, true)}
                            icon={<MenuIcon />} />
                    </BottomNavigation>
                </Paper>
            ))}

            <div>
                {(['']).map((anchor) => (
                    <React.Fragment key={anchor}>
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
        </>
    );
}
