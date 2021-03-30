import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  Avatar,
  Paper,
  Grid,
  Typography,
  Container,
  Button,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";

import Icon from "./icon";

import { LockOutlined } from "@material-ui/icons";
import useStyles from "./styles";
import Input from "./Input";

function Auth() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);

  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);
  const switchMode = () => {
    setIsSignup((prevIsSIgnup) => !prevIsSIgnup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: "AUTH", payload: { userInfo: result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err) => {
    console.log(err);
    console.log("google sign in was unsuccessful");
  };

  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlined />
        </Avatar>
        <Typography variant="h5">{isSignup ? "Sign up" : "Sign in"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="FIrst Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign up" : "Sign in"}
          </Button>
          <GoogleLogin
            clientId="52406830855-hu1ndjgllv1gl58v0ub7aof5ufka506v.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                classeName={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Sign in with Google
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid
            container
            className={classes.switchSignInAndOut}
            justify="flex-end"
          >
            <Grid item>
              <Button onClick={switchMode} color="default">
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Do not have an account? Sign up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Auth;
