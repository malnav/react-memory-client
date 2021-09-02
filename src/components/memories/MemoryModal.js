import React from 'react';
import Modal from '@material-ui/core/Modal';
import useStyles from "./Styles";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {useState,useContext} from 'react'
import {GlobalContext} from '../../context/GlobalState'





export default function MemoryModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  //const [modalStyle] = useState(getModalStyle);
  const { modalMemory, open, setOpen } =  useContext(GlobalContext)
  
  const handleClose = () => {
    setOpen(false);
  };
  

  return (
    <div className={classes.root}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {
            <>
                <Card className={classes.modal}>
                    <CardMedia
                        className={classes.media1}
                        image={modalMemory.selectedFile}
                        />
    
                </Card>
            </>
            
        }
        
      </Modal>
    </div>
  );
}