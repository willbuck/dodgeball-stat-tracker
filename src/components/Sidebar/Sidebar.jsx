// Hooks
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// Component imports
import LogOutButton from '../Login-Register/Login/LogOutButton';

// MUI Imports
import Box from '@mui/material/Box';
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
import LogoutIcon from '@mui/icons-material/Logout';


export default function Sidebar() {
    const history = useHistory();

    const user = useSelector(store => store.user);

    const [state, setState] = useState({ right: false, });

    const toggleDrawer = (anchor, open) => (event) => {
        setState({ ...state, [anchor]: open });
    };

    return (
        <Box
            sx={{ width: 250 }}
            onClick={toggleDrawer('right', false)}
            onKeyDown={toggleDrawer('right', false)}
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
                    <ListItemButton sx={{ marginLeft: 3 }}>
                        <LogoutIcon /><LogOutButton
                            className="navLink"
                            onClick={() => history.push('/home')}
                        />
                    </ListItemButton>
                </ListItem>
            )}
            <Divider />
            <ListItem key="Home" >
                <ListItemButton onClick={() => history.push('/home')}>
                    <HomeIcon sx={{ marginRight: 1, marginLeft: 3 }} /><ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>

            <Divider />

            {/* Team Captain Level Privileges */}
            {user.auth_level === 3 && (
                <>
                    <ListItem disablePadding>
                        <ListItemText sx={{ marginLeft: 1.5 }} primary="Team Captain" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin//admin/manage-teams')}>
                                <GroupsIcon sx={{ marginRight: 1 }} /><ListItemText primary="Manage Team" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}

            {/* Tournament Admin Level Privileges */}
            {user.auth_level === 4 && (
                <>
                    <ListItem disablePadding>
                        <ListItemText sx={{ marginLeft: 1.5 }} primary="Tournament Admin" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-tournaments')}>
                                <EditNoteIcon sx={{ marginRight: 1 }} /><ListItemText primary="Manage Tournaments" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}

            {/* Full Admin Level Privileges */}
            {user.auth_level === 5 && (
                <>
                    <ListItem disablePadding>
                        <ListItemText sx={{ marginLeft: 1.5 }} primary="Admin" />
                    </ListItem>
                    <List>
                        <ListItem key="link1" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/create-tournament')}>
                                <PlaylistAddIcon sx={{ marginRight: 1 }} /><ListItemText primary="Create Tournament" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link2" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-tournaments')}>
                                <EditNoteIcon sx={{ marginRight: 1 }} /><ListItemText primary="Manage Tournaments" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link3" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/add-team')}>
                                <GroupAddIcon sx={{ marginRight: 1 }} /><ListItemText primary="Add Team" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link4" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-teams')}>
                                <GroupsIcon sx={{ marginRight: 1 }} /><ListItemText primary="Manage Teams" />
                            </ListItemButton>
                        </ListItem>
                        <ListItem key="link5" disablePadding>
                            <ListItemButton onClick={() => history.push('/admin/manage-users')}>
                                <BadgeIcon sx={{ marginRight: 1 }} /><ListItemText primary="Manage Users" />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </>
            )}
        </Box>
    );
}
