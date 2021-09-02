import Memory from './Memory'
import useStyle from './Styles'
import { Grid, Paper } from '@material-ui/core';
import {Pagination} from "@material-ui/lab"
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react'
import React, {useState} from 'react'


const Memories = () => {

  const classes = useStyle()
  const numberOfItems = 6
  const { memories} = useContext(GlobalContext)
  const [currentPage, setCurrentPage] = useState(1)
  const indexOfLastItem = currentPage * numberOfItems
  const indexOfFirstItem = indexOfLastItem - numberOfItems
  const items = memories.slice(indexOfFirstItem,indexOfLastItem)
  
  

  const changePage = (page) => {
    setCurrentPage(page)
  }

  if(items.length===0 && currentPage>1){
    changePage(currentPage-1)
  }
  
  

  

  return (
    <>
    
    {
      items.length>0 &&
      (
        <Paper className={classes.pages}>
          <Pagination variant="outlined" shape="rounded" count={Math.ceil(memories.length/numberOfItems)} onChange={(event,page)=>changePage(page)}/>
        </Paper>
      )
        
    }
      
      <Grid className={classes.container} container alignItems="stretch" spacing={1}>
        {
          items.map(memory => (
            <Grid item xs={12} sm={12} md={4}>
              <Memory key={memory._id} memory={memory} />
            </Grid>
          ))
        }
      </Grid>
      
      
    </>
  )
}

export default Memories
