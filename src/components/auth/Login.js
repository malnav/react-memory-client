import Icon from './Icon'
import Input from './Input'
import useStyles from './Styles'
import { useContext,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import GoogleLogin from 'react-google-login'
import { GlobalContext } from '../../context/GlobalState'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import { verifyLoginInfo } from '../../services/UserAPI'

const Login = () => {

    const classes = useStyles();
    const { setUser } = useContext(GlobalContext) 
    const history = useHistory()

    useEffect(()=>{
      if(JSON.parse(localStorage.getItem('user'))){
        history.push('/')
      }
    },[])// eslint-disable-line react-hooks/exhaustive-deps

    const signIn = async (formData) => {
      try {
        const response = await verifyLoginInfo(formData)
        if (response.status === 201) {
          const verifiedUser = response.data;
          localStorage.setItem("user", JSON.stringify(verifiedUser));
          setUser(verifiedUser);
          history.push("/");
        }
      } catch (error) {
        console.log(error);
      }
    };
    const loginGoogleSuccess = (response) => {
    console.log("🚀 ~ response", response)
      const profile = {
        name: response.profileObj.name,
        photo: response.profileObj.imageUrl,
        email: response.profileObj.email,
        _id: response.profileObj.googleId
      }
      const token = response?.tokenId
      const user = {profile,token}
      localStorage.setItem("user",JSON.stringify(user))
      setUser(user)
      history.push('/')
    }
    const loginGoogleFail = (response) => {
      console.log(response)
    }
    const handleLoginForm = (e) => {
        e.preventDefault()
        const email = e.target.email.value
        const password = e.target.password.value
        signIn({email,password})  
    }

    return (
        <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">Sign in</Typography>
          <form className={classes.form} onSubmit={handleLoginForm}>
            <Grid container spacing={2}> 
              <Input name="email" label="Email Address" type="email" />
              <Input name="password" label="Password" type='password' />
            </Grid>
            <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} >
              Sign In
            </Button>
                <GoogleLogin
                  clientId="233713890537-fdf6n9o4mtd7gr3h4pv3brglpjvjtdgi.apps.googleusercontent.com"
                  render={renderProps => (
                    <Button onClick={renderProps.onClick} disabled={renderProps.disabled} className={classes.googleButton} color="primary" fullWidth startIcon={<Icon />} variant="contained">Google Sign In</Button>
                  )}
                  buttonText="Login"
                  onSuccess={loginGoogleSuccess}
                  onFailure={loginGoogleFail}
                  cookiePolicy={'single_host_origin'}
                />
            <Grid container justify="flex-end">
              <Grid item>
                <Link to="/signup">Don't have an account? Sign Up</Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    )
}

export default Login
