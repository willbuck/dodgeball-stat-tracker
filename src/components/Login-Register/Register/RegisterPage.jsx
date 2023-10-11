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
        <IconUserPlus />
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
