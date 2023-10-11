import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom'

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const errors = useSelector((store) => store.errors);
  const user = useSelector(store => store.user);

  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        ...user,
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    // <form className="formPanel" onSubmit={registerUser}>
    //   <h2>Register User</h2>
    //   {errors.registrationMessage && (
    //     <h3 className="alert" role="alert">
    //       {errors.registrationMessage}
    //     </h3>
    //   )}
    //   <div>
    //     <label htmlFor="username">
    //       Username:
    //       <input
    //         type="text"
    //         name="username"
    //         value={username}
    //         required
    //         onChange={(event) => setUsername(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <label htmlFor="password">
    //       Password:
    //       <input
    //         type="password"
    //         name="password"
    //         value={password}
    //         required
    //         onChange={(event) => setPassword(event.target.value)}
    //       />
    //     </label>
    //   </div>
    //   <div>
    //     <input className="btn" type="submit" name="submit" value="Register" />
    //   </div>
    // </form>

    <Box component="form" onSubmit={registerUser} noValidate sx={{ mt: 1 }}>
    <TextField
      margin="normal"
      required
      fullWidth
      value={username}
      onChange={(event) => setUsername(event.target.value)}
      label="Username"
      name="username"
      autoComplete="username"
      autoFocus
    />
    <TextField
      margin="normal"
      required
      fullWidth
      name="password"
      label="Password"
      type="password"
      value={password}
      onChange={(event) => setPassword(event.target.value)}
      autoComplete="current-password"
    />
    <FormControlLabel
      control={<Checkbox value="remember" color="primary" />}
      label="Remember me"
    />
    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
      Sign In
    </Button>
    <Grid container>
      <Grid item xs></Grid>
      <Grid item>
        <Link href="/#/login/" variant="body2">
          {"Already have an account? Log in"}
        </Link>
      </Grid>
    </Grid>
  </Box>
  );
}

export default RegisterForm;
