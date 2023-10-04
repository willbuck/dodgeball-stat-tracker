import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
// import { Height } from '@mui/icons-material';

function Header() {
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((store) => store.user);


    const getCurrentRouteTitle = () => {
        const pathname = location.pathname;
        // const routeName = pathname.split('/').filter(Boolean).pop();
        // return routeName;
        if (pathname === '/home') {
            return 'Home';
        } else if (pathname.startsWith('/about')) {
            return 'About';
        } else if (pathname.startsWith('/info')) {
            return 'Info';
        } else if (pathname.startsWith('/admin')) {
            return 'Admin';
        } else if (pathname.startsWith('/gameview')) {
            return 'Game View';
        } else if (pathname.startsWith('/tournamentDetails')) {
            return 'Tournament Details';
        } else if (pathname.startsWith('/create-tournament')) {
            return 'Create Tournament';
        } else if (pathname.startsWith('/manage-tournament')) {
            return 'Manage Tournament';
        } else if (pathname.startsWith('/registration')) {
            return 'Registration';
        } else {
            return 'Unknown Page';
        }
    };

    const currentTitle = getCurrentRouteTitle();


    return (
        <div className="header" style={{ justifyContent: 'space-between' }}>
            <Link to="/home">
                <img
                    src='https://s3.amazonaws.com/playpass-discovery/production/organizers/logos/31127/wide_USAD-SITELOGO.png?1581286742'
                    style={{ height: '100px', width: '100px' }}
                />
            </Link>

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
