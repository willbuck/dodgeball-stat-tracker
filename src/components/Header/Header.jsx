import React from 'react';
import { Link, useHistory, } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';
// import { Height } from '@mui/icons-material';

function Header() {
    const history = useHistory();
    const user = useSelector((store) => store.user);


    const getCurrentRouteName = () => {
        const pathname = history.location.pathname;
        const routeName = pathname.split('/').filter(Boolean).pop();
        return routeName;
    };


    const currentPage = getCurrentRouteName();


    return (
        <div className="header">
            <Link to="/home">
                <img
                    src='https://s3.amazonaws.com/playpass-discovery/production/organizers/logos/31127/wide_USAD-SITELOGO.png?1581286742'
                    style={{ height: '20px', width: '20px' }}
                />
            </Link>

            <div>
                <h2 className="header-title">{currentPage}</h2>
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
