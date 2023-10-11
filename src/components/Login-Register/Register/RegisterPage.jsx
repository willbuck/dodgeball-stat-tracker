import React from 'react';
import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

import { IconUserPlus } from '@tabler/icons-react';

function RegisterPage() {
  const history = useHistory();

  return (
    // <div>
    //   <RegisterForm />

    //   <center>
    //     <button
    //       type="button"
    //       className="btn btn_asLink"
    //       onClick={() => {
    //         history.push('/login');
    //       }}
    //     >
    //       Login
    //     </button>
    //   </center>
    // </div>

    <Container component="main" maxWidth="xs">

    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        TODO: ADD NEW ICON
      </Avatar>
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <RegisterForm />
    </Box>
  </Container>
  );
}

export default RegisterPage;
