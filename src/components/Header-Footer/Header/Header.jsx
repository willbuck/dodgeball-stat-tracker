import { Link, useLocation, } from 'react-router-dom';


function Header() {
    const location = useLocation();

    let currentTitle = '';

    // Switch statement to render header text
    // based on the current react router url
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
        case location.pathname.startsWith('/leaderboard'):
            currentTitle = 'Leaderboard';
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

            <div>
                <h2 className="header-title">{currentTitle}</h2>
            </div>

        </div>
    );
}

export default Header;
