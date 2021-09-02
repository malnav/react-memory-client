import useStyle from "./Styles";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalState"
import { addMemoryAPI, updateMemoryAPI } from '../../services/memoriesAPI'

const Form = () => {
  const classes = useStyle();

  const { setMemoryGlobal, memoryGlobal, memories,setMemories } = useContext(GlobalContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (memoryGlobal._id) {
      updateMemory(memoryGlobal);
    } else {
      const c = JSON.parse(localStorage.getItem("user")).profile.name
      const newMemoryGlobal = { ...memoryGlobal, creator: c}
      addMemory(newMemoryGlobal)
    }
    clearForm();
  };

  const clearForm = () => {
    const newMemory = {...memoryGlobal,_id:null,title: "", message: "",tags: [], selectedFile: ""} 
    setMemoryGlobal(newMemory);
  };

  const updateMemory = async (memory) => {
    const response = await updateMemoryAPI(memory)
    if(response.status === 204) {
      const newMemoriesList = memories.map((m) => {
      if (m._id === memory._id) {
        m = memory;
        return m;
      }
      return m;
      });
      setMemories(newMemoriesList);
    }
  };

  const addMemory = async (memory) => {
    try {
      const response = await addMemoryAPI(memory)
      if(response.status === 200){
        const newMemoriesList = [...memories, response.data];
        setMemories(newMemoriesList);
      }else{
        console.log(response)
      }
    } catch (error) {
      console.log(error)
    }
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
          <Typography variant="h6">
            {!memoryGlobal._id ? "Add A Memory" : "Edit A Memory"}
          </Typography>
          {/* <TextField
            value={memory.creator}
            name="creator"
            variant="outlined"
            label="Creator"
            fullWidth
            onChange={(e) => setMemory({ ...memory, creator: e.target.value })}
          /> */}
          <TextField
            value={memoryGlobal.title}
            name="title"
            variant="outlined"
            label="Title"
            fullWidth
            onChange={(e) => setMemoryGlobal({ ...memoryGlobal, title: e.target.value })}
          />
          <TextField
            value={memoryGlobal.message}
            name="message"
            variant="outlined"
            label="Message"
            fullWidth
            multiline
            rows={4}
            onChange={(e) => setMemoryGlobal({ ...memoryGlobal, message: e.target.value })}
          />
          <TextField
            value={memoryGlobal.tags}
            name="tags"
            variant="outlined"
            label="Tags (coma separated)"
            fullWidth
            onChange={(e) =>
              setMemoryGlobal({ ...memoryGlobal, tags: e.target.value.split(`,`) })
            }
          />
          <div className={classes.fileInput}>
            <FileBase
              name="selectedFile"
              type="file"
              multiple={false}
              onDone={({ base64 }) =>
                setMemoryGlobal({ ...memoryGlobal, selectedFile: base64 })
              }
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={clearForm}
            fullWidth
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
