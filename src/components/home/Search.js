import {Paper,form, Button, TextField} from '@material-ui/core'
import {useState} from 'react'
import { GlobalContext } from '../../context/GlobalState';
import { useContext } from 'react'
import { searchMemoriesAPI, getMemoriesAPI } from '../../services/memoriesAPI';
import useStyle from "./Styles";



const Search = () => {
    
    const classes = useStyle()
    const [query, setQuery] = useState('')
    const {setMemories } = useContext(GlobalContext)

    const handleSearch = (e) => {
        setQuery(e.target.value)
    }

    const getAllMemories = async () => {
        
        const response = await getMemoriesAPI()
        console.log("🚀 ~ response", response)
        if (response.status === 200){
            setMemories(response.data) 
        }
        
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        searchMemories()
    }

    const searchMemories = async () => {

        const response = await searchMemoriesAPI(query)
        if (response.status === 200){
            setMemories(response.data) 
        }
    }
    const resetMemories= () => {
        setQuery("")
        getAllMemories()
    }

    return (
        <>
        <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
            <TextField
                        value={query}
                        name="search"
                        variant="outlined"
                        label="Search Memories"
                        fullWidth
                        onChange={handleSearch}
                    />
        
            <Button
                className={classes.buttonSubmit}
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                fullWidth>
            Search
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={resetMemories}
            fullWidth
          >
            Clear Search
          </Button>
        </form>
        </Paper>
        </>
    )
}

export default Search