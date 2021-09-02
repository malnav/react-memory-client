import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core'
import { Link, useHistory } from 'react-router-dom'
import memories from '../../images/memories.png'
import useStyles from './Styles'
import { GlobalContext } from '../../context/GlobalState'
import {useContext} from 'react'

const NavBar = () => {  
  
  const {user,setUser} = useContext(GlobalContext)

  const history = useHistory()
  const classes = useStyles()

  const signOut = () => {
    localStorage.clear()
    history.push('/login')
    setUser('')
  }
    return (
      <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography component={Link} to="/" className={classes.heading} variant="h3" align="center">Memories</Typography>
        <img className={classes.image} src={memories} alt="icon" height="40" />
      </div>
      <Toolbar className={classes.toolbar}>
      { user ? 
          (<div className={classes.profile}>
            <Avatar className={classes.purple} alt='' src={user.profile.photo}>{user.profile.name}</Avatar>
            <Typography className={classes.userName} variant="h6">{user.profile.name}</Typography>
            <Button variant="contained" className={classes.logout} color="secondary" onClick={signOut}>Logout</Button>
          </div>)
        : (<Button component={Link} to="/login" variant="contained" color="primary">Sign In</Button>)
        }
      </Toolbar>
    </AppBar>
    )
}

export default NavBar
