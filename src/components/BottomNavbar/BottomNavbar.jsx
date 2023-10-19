import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

// Bottom Navbar Imports
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import MenuIcon from '@mui/icons-material/Menu';

// Sidebar imports
import Drawer from '@mui/material/Drawer';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Custom components
import Sidebar from '../Sidebar/Sidebar';


export default function BottomNavbar() {
    const [state, setState] = useState({right: false});

    // Sidebar functions
    const history = useHistory();

    // Handler to open/close sidebar
    const toggleDrawer = (anchor, open) => () => {
        setState({ [anchor]: open });
    };

    return (
        <>
        {/* FOOTER */}
            <BottomNavigation component={Paper} sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomNavigationAction
                    component="button"
                    icon={<ArrowBackIcon />}
                    onClick={() => history.goBack()} />
                <BottomNavigationAction component={Link} to="/home" icon={<HomeIcon />} />
                <BottomNavigationAction
                    onClick={toggleDrawer('right', true)}
                    icon={<MenuIcon />} />
            </BottomNavigation>

        {/* SIDEBAR */}
            <Drawer
                anchor='right'
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                <Sidebar />
            </Drawer>

        </>
    );
}