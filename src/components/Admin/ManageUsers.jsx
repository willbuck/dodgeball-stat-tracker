import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Box, Card, Typography, Grid, Container, Badge, } from '@mui/material';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
// import EditIcon from '@mui/icons-material/Edit';
// import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
// import MoreHorizIcon from '@mui/icons-material/MoreHoriz';


export default function ManageUsers() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dispatch = useDispatch()
    const allUsers = useSelector((store) => store.manageUsersReducer)

    useEffect(() => {
        dispatch({ type: "FETCH_USER_LIST" });
    }, []);

    const handleCaptain = (id) => {
        console.log("allusers", allUsers)
        console.log("user", id);
        dispatch({ type: "PROMOTE_USER", payload: id, auth: 3 });
    }

    const handleAdmin = (id) => {
        console.log("allusers", allUsers)
        console.log("user", id);
        dispatch({ type: "PROMOTE_USER", payload: id, auth: 4 });
    }

    const handleSiteAdmin = (id) => {
        console.log("allusers", allUsers)
        console.log("user", id);
        dispatch({ type: "PROMOTE_USER", payload: id, auth: 5 });
    }



    const [selectedUser, setSelectedUser] = useState(null);

    // This functions handles the selected game
    const handleSearchbarClick = (newValue) => {
        setSelectedUser(newValue);
    };

    return (
        <Container sx={{ marginBottom: 15 }}>

            {/* Search for specific user */}
            <Stack spacing={2} sx={{ width: 300 }}>
                <Autocomplete
                    id="free-solo-2-demo"
                    options={allUsers}
                    getOptionLabel={(option) =>
                        `${option.username}`
                    }
                    onChange={(event, newValue) => {
                        handleSearchbarClick(newValue);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Search All Users"
                            InputProps={{
                                ...params.InputProps,
                                type: "search",
                            }}
                        />
                    )}
                />
            </Stack>

            {/* conditionally render selected user */}

            {selectedUser ? (
                // Display selected user
                <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
                    <Box>
                        <Box>
                            <Typography variant="h5">
                                {selectedUser.username}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography variant="body3">
                                Email: {selectedUser.email}
                            </Typography>
                        </Box>

                        <Button
                            id="demo-customized-button"
                            value={selectedUser.id}
                            aria-controls={open ? 'demo-customized-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            variant="contained"
                            disableElevation
                            onClick={handleClick}
                            endIcon={<KeyboardArrowDownIcon />}
                        >
                            <MilitaryTechIcon sx={{ fontSize: 30 }} />
                            Promote
                        </Button>
                        <Menu
                            id="demo-customized-menu"
                            MenuListProps={{
                                'aria-labelledby': 'demo-customized-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                        >
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handleCaptain(anchorEl.value);
                                }}
                                disableRipple
                            >
                                <StarOutlineIcon />
                                Make Team Captain
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handleAdmin(anchorEl.value);
                                }}
                                disableRipple
                            >
                                <StarHalfIcon />
                                Make Tournament Admin
                            </MenuItem>
                            <MenuItem
                                onClick={() => {
                                    handleClose();
                                    handleSiteAdmin(anchorEl.value);
                                }}
                                disableRipple
                            >
                                <AdminPanelSettingsIcon />
                                Make Site Admin
                            </MenuItem>
                        </Menu>
                    </Box>
                </Card>
            ) : (
                <>

                </>
            )}



            {/* User Auth Level Sections */}
            {Array.from([3, 4, 5]).map((authLevel) => (
                <Box key={authLevel} sx={{ marginTop: 8 }}>
                    <Divider />
                    <Typography variant="h5" sx={{ marginLeft: 2 }}>
                        {authLevel === 3
                            ? 'Team Captains'
                            : authLevel === 4
                                ? 'Tournament Admins'
                                : 'Site Admins'}
                    </Typography>
                    <Grid container spacing={3}>
                        {allUsers
                            .filter((user) => user.auth_level === authLevel)
                            .map((user) => (
                                <Grid item xs={12} sm={6} md={4} key={user.id}>
                                    <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
                                        <Box>
                                            <Box>
                                                <Typography variant="h5">
                                                    {user.username}
                                                </Typography>
                                            </Box>

                                            <Box>
                                                <Typography variant="body3">
                                                    Email: {user.email}
                                                </Typography>
                                            </Box>
                                            <Button
                                                id="demo-customized-button"
                                                value={user.id}
                                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={open ? 'true' : undefined}
                                                variant="contained"
                                                disableElevation
                                                onClick={handleClick}
                                                endIcon={<KeyboardArrowDownIcon />}
                                            >
                                                <MilitaryTechIcon sx={{ fontSize: 30 }} />
                                                Promote
                                            </Button>
                                            <Menu
                                                id="demo-customized-menu"
                                                MenuListProps={{
                                                    'aria-labelledby': 'demo-customized-button',
                                                }}
                                                anchorEl={anchorEl}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                <MenuItem
                                                    onClick={() => {
                                                        handleClose();
                                                        handleCaptain(anchorEl.value);
                                                    }}
                                                    disableRipple
                                                >
                                                    <StarOutlineIcon />
                                                    Make Team Captain
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        handleClose();
                                                        handleAdmin(anchorEl.value);
                                                    }}
                                                    disableRipple
                                                >
                                                    <StarHalfIcon />
                                                    Make Tournament Admin
                                                </MenuItem>
                                                <MenuItem
                                                    onClick={() => {
                                                        handleClose();
                                                        handleSiteAdmin(anchorEl.value);
                                                    }}
                                                    disableRipple
                                                >
                                                    <AdminPanelSettingsIcon />
                                                    Make Site Admin
                                                </MenuItem>
                                            </Menu>
                                        </Box>
                                    </Card>
                                </Grid>
                            ))}
                        {allUsers.filter((user) => user.auth_level === authLevel).length === 0 && (
                            <Grid item xs={12} sm={6} md={4}>
                                <Card sx={{ padding: '20px', margin: '10px', border: '1px solid grey' }}>
                                    <Typography variant="h6" sx={{ textAlign: 'center' }}>
                                        No {authLevel === 3 ? 'Team Captains' : authLevel === 4 ? 'Tournament Admins' : 'Site Admins'}
                                    </Typography>
                                </Card>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            ))}

        </Container>
    )
}