import React from 'react';
import { Link, useHistory, useLocation, } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import LogOutButton from '../LogOutButton/LogOutButton';

// MUI Components
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
// import { Height } from '@mui/icons-material';

function Header() {
    const history = useHistory();
    const location = useLocation();
    const user = useSelector((store) => store.user);
    // const currentScore = useSelector((store) => store.playersReducer);
    // const team1_score = currentScore.game.team1_score;
    // const team2_score = currentScore.game.team2_score;


    let currentTitle = '';

    switch (true) {
        case location.pathname.startsWith('/gameview'):
            currentTitle = 'Game: ';
            break;
        case location.pathname.startsWith('/games'):
            currentTitle = 'Games';
            break;
        case location.pathname.startsWith('/admin/create-tournament'):
            currentTitle = 'Create Tournament';
            break;
        case location.pathname.startsWith('/admin/manage-tournament'):
            currentTitle = 'Manage Tournaments';
            break;
        case location.pathname.startsWith('/tournamentDetails'):
            currentTitle = 'Tournament Details';
            break;
        case location.pathname.startsWith('/admin/add-team'):
            currentTitle = 'Add Teams';
            break;
        case location.pathname.startsWith('/admin/manage-teams'):
            currentTitle = 'Manage Teams';
            break;
        case location.pathname.startsWith('/admin/manage-users'):
            currentTitle = 'Manage Users';
            break;
        case location.pathname.startsWith('/home'):
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
        case location.pathname.startsWith('/login'):
            currentTitle = 'Login / Register';
            break;
        case location.pathname.startsWith('/about'):
            currentTitle = 'About';
            break;
        default:
            currentTitle = 'Page Not Found';
    }


    return (
        <div className="header" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/home">
                <img
                    src='https://s3.amazonaws.com/playpass-discovery/production/organizers/logos/31127/wide_USAD-SITELOGO.png?1581286742'
                    style={{ height: '75px', width: '75px' }}
                />
            </Link>

            {location.pathname !== '/home' && (
                <IconButton onClick={() => { history.goBack() }} sx={{ color: '#186BCC', }}>
                    <ArrowBackIcon />
                </IconButton>
            )}

            <div>
                <h2 className="header-title">{currentTitle}</h2>
                {/* {currentTitle === 'Game View' &&
                    <div>
                        <h3>Score: {team1_score} - {team2_score}</h3>
                    </div>
                } */}
            </div>

            <div>{/* Temporary Empty Div for Title Placement */}</div>

        </div>
    );
}

export default Header;
