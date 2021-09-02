import useStyle from "./Styles";
import Moment from "react-moment";
import React,{ useContext, useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import OpenInNew from "@material-ui/icons/OpenInNew";
import { GlobalContext } from "../../context/GlobalState";
import Likes from "./Likes";
import { deleteMemoryAPI, updateLikeAPI } from "../../services/memoriesAPI";



import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from "@material-ui/core/";



const Memory = ({ memory }) => {
  
  const classes = useStyle()
  

  const { setModalMemory, setMemoryGlobal, memories, setMemories, user,open, setOpen } =
    useContext(GlobalContext)
  
  const deleteMemory = async (id) => {
    try {

      const response = await deleteMemoryAPI(id)
      if (response.status === 204)
      {
        const newMemoriesList = memories.filter((memoryDelete) => memoryDelete._id !== id);
        setMemories(newMemoriesList);
      }
      else {
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateLike = async (id) => {
    const token = user.token
    console.log("🚀 ~ token", token)
    const response = await updateLikeAPI(id)
    if(response.status === 200){
      const updatedMemory = response.data
      const newMemoriesList = memories.map((memoryLike) => {
        if (memoryLike._id === updatedMemory._id) {
          memoryLike.whoLiked = updatedMemory.whoLiked
          return memoryLike;
        }
        return memoryLike;
      })
      setMemories(newMemoriesList);
    }
  }

  const clickEditMemory = (id) => {
    const m = memories.find((memoryEdit) => memoryEdit._id === id);
    setMemoryGlobal(m);
  }

  const handleOpen = (id) => {
    setOpen(true);
    const m = memories.find((memoryEdit) => memoryEdit._id === id);
    setModalMemory(m)
  };

  

  
  return (
    <>
    
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={memory.selectedFile} />
      <div className={classes.overlay}>
        <Typography variant="h6">{memory.creator}</Typography>
        <Typography variant="body2">
          <Moment fromNow>{memory.createdAt}</Moment>
        </Typography>
      </div>
      <div className={classes.overlay2}>
        {memory.creator === user?.profile?.name &&
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={() => clickEditMemory(memory._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
        }
      </div>
      <div className={classes.overlay3}>
        <Button
          style={{ color: "white" }}
          size="small"
          onClick={()=> handleOpen(memory._id)}
        >
          <OpenInNew fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">
          {memory.tags.map((tag) => (
            <span>#{tag}</span>
          ))}
        </Typography>
      </div>
      <Typography
        className={classes.title}
        gutterBottom
        variant="h5"
        component="h2"
      >
        {memory.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {memory.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
            <Button
          disabled={!user}
          size="small"
          color="primary"
          onClick={() => updateLike(memory._id,user?.profile?._id)}
        >
          <Likes whoLikedArray={memory.whoLiked} currentUser={user}/>

        </Button>

        {memory.creator === user?.profile?.name && (
          <Button
            size="small"
            color="primary"
            onClick={() => deleteMemory(memory._id)}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
    </>
  );
};

export default Memory;
