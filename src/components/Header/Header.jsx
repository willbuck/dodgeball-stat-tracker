import React from 'react';
import { Link, useHistory, useLocation, } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

// MUI Components
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
// import { Height } from '@mui/icons-material';

function Header() {
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((store) => store.user);


    let currentTitle = '';

    switch (true) {
        case location.pathname.startsWith('/gameview'):
            currentTitle = 'Game View';
            break;
        case location.pathname.startsWith('/admin/manage-tournament'):
            currentTitle = 'Manage Tournament';
            break;
        case location.pathname.startsWith('/tournamentDetails'):
            currentTitle = 'Tournament Details';
            break;
        case location.pathname.startsWith('/admin/create-tournament'):
            currentTitle = 'Create Tournament';
            break;
        case location.pathname.startsWith('/user'):
            currentTitle = 'Home';
            break;
        case location.pathname.startsWith('/admin'):
            currentTitle = 'Admin';
            break;
        case location.pathname.startsWith('/registration'):
            currentTitle = 'Registration';
            break;
        case location.pathname.startsWith('/info'):
            currentTitle = 'Info';
            break;
        case location.pathname.startsWith('/about'):
            currentTitle = 'About';
            break;
        default:
            currentTitle = 'Unknown Page';
    }


    return (
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/home">
                <img
                    src='https://s3.amazonaws.com/playpass-discovery/production/organizers/logos/31127/wide_USAD-SITELOGO.png?1581286742'
                    style={{ height: '75px', width: '75px' }}
                />
            </Link>

            <IconButton onClick={() => { history.goBack() }} sx={{ color: '#186BCC', }}>
                <ArrowBackIcon />
            </IconButton>

            <div>
                <h2 className="header-title">{currentTitle}</h2>
            </div>

            <div>
                {/* If no user is logged in, show these links */}
                {!user.id && (
                    // If there's no user, show login/registration links
                    <Link className="navLink" to="/login">
                        Login / Register
                    </Link>
                )}

                {/* If a user is logged in, show these links */}
                {user.id && (
                    <>
                        <LogOutButton className="navLink" />
                    </>
                )}

            </div>


        </div>
    );
}

export default Header;
