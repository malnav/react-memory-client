import Input from "./Input";
import Icon from "./Icon";
import useStyles from "./Styles";
import GoogleLogin from "react-google-login";
import { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { GlobalContext } from "../../context/GlobalState";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import { createUserAPI } from "../../services/UserAPI";

const Signup = () => {

  const { setUser } = useContext(GlobalContext);
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("user"))) {
      history.push("/");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const createUser = async (signUpData) => {
    try {
      const response = await createUserAPI(signUpData)
      if (response.status === 201) {
        const createdUser = response.data
        localStorage.setItem("user", JSON.stringify(createdUser))
        setUser(createdUser)
        history.push("/")
      }
      else {
        
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signUpUser = (e) => {
    
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    //validate confirmPassword
    if (password === confirmPassword) {
      createUser({ firstName, lastName, email, password });
    } else {
      alert("password and repeate password does not match");
    }
  };


  const loginGoogleSuccess = (response) => {
    const profile = {
      name: response.profileObj.name,
      photo: response.profileObj.imageUrl,
      email: response.profileObj.email,
      _id: response.profileObj.googleId
    };
    const token = response?.tokenId;
    const user = { profile, token };
    localStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    history.push("/");
  };

  const loginGoogleFail = (response) => { 
    console.log(response)
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signUpUser}>
          <Grid container spacing={2}>
            <Input name="firstName" label="First Name" autoFocus half />
            <Input name="lastName" label="Last Name" half />
            <Input name="email" label="Email Address" type="email" />
            <Input name="password" label="Password" type="password" />
            <Input
              name="confirmPassword"
              label="Repeat Password"
              type="password"
            />
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <GoogleLogin
            clientId="233713890537-fdf6n9o4mtd7gr3h4pv3brglpjvjtdgi.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className={classes.googleButton}
                color="primary"
                fullWidth
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            buttonText="Login"
            onSuccess={loginGoogleSuccess}
            onFailure={loginGoogleFail}
            cookiePolicy={"single_host_origin"}
          />
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Signup;
