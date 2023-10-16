import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";


function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((store) => store.user);
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();
  const [ open, setOpen ] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false);
  };

  const handlePresentation = () => {
    setUsername("gavin_the_admin");
    setPassword("gavin_the_admin");
  }

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: "LOGIN",
        payload: {
          ...user,
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: "LOGIN_INPUT_ERROR" });
      handleOpen()
    }
  }; // end login

  return (
    <Box component="form" onSubmit={login} noValidate sx={{ mt: 1 }}>
      {(
        <Dialog open={open} onClose={handleClose} className="alert">
          <DialogTitle>Incorrect Password</DialogTitle>
          <DialogContent>
            <p>{errors.loginMessage}</p>
          </DialogContent>
        </Dialog>
      )}
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
        onClick={handlePresentation}
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
          <Link href="/#/registration/" variant="body2">
            {"Don't have an account? Sign Up"}
          </Link>
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoginForm;
