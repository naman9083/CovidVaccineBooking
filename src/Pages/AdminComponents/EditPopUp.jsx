import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { Button, TextField, Typography } from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
 
}));

const EditPopUp = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="text" color="secondary" onClick={() => {
        handleOpen();
      }}>
        Edit
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >

        <TextField
            id="outlined-basic"
            label="Edit No of Slots"
            variant="outlined"
            
            style={{ width: "100%" }}
            />
            {/* edit centre */}
            <TextField
            id="outlined-basic"
            label="Edit Centre"
            variant="outlined"
            style={{ width: "100%" }}
            />
            {/* edit date */}
            <TextField
            id="outlined-basic"
            label="Edit Date"
            variant="outlined"
            style={{ width: "100%" }}
            />
            {/* edit time */}
            <TextField
            id="outlined-basic"
            label="Edit Time"
            variant="outlined"
            style={{ width: "100%" }}
            />
            {/* edit vaccine */}
            <TextField
            id="outlined-basic"
            label="Edit Vaccine"
            variant="outlined"
            style={{ width: "100%" }}
            />
            

      </Modal>
    </div>
  );
};

export default EditPopUp;
