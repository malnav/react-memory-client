import { Paper, Typography, Grow, Grid } from "@material-ui/core"
import Form from './Form'
import Memories from '../memories/Memories'
import useStyle from './Styles'
import { useContext, useEffect } from 'react'
import { GlobalContext } from "../../context/GlobalState"
import Search from "./Search"
import { getMemoriesAPI } from '../../services/memoriesAPI'
import MemoryModal from '../memories/MemoryModal'

const Home = () => {

  const { setMemories } = useContext(GlobalContext)

  const classes = useStyle()

  const {user} = useContext(GlobalContext)
  

  useEffect(() => {
    const getMemories = async () => {
      const response = await getMemoriesAPI()
      if (response.status === 200){
        setMemories(response.data) 
      }
    }
    getMemories()
  }, [])// eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
    <MemoryModal />
    <Grow in>
        
        <Grid container justifyContent='space-between' alignItems='Strecth' spacing={3}>
          <Grid item xs={12} md={4} sm={6}>
          { user ? (<>
                      <Form />
                      <Search />
                    </>) : (
                  <Paper className={classes.paper}>
                      <Typography variant="h6" align="center">
                        Please Sign In to create your own memories and like other's memories.
                      </Typography>
                  </Paper>
                
                )
          }
          </Grid>
          <Grid item xs={12} md={8} sm={6}>
              <Memories />
          </Grid>
        </Grid>
        
    </Grow>
  </>
  )
}

export default Home
