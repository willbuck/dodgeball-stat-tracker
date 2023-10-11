import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';

import CssBaseline from '@mui/material/CssBaseline';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

function LoginPage() {
  const history = useHistory();

  return (
    // <div>
    //   <LoginForm />

    //   <center>
    //     <button
    //       type="button"
    //       className="btn btn_asLink"
    //       onClick={() => {
    //         history.push('/registration');
    //       }}
    //     >
    //       Register
    //     </button>
    //   </center>
    // </div>
          <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
              sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <LoginForm />
            </Box>
          </Container>
    );
}

export default LoginPage;
