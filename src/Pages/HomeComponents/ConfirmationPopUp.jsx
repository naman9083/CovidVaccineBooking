import { Backdrop, Button, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import { auth } from "../../Firebase";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",

    justifyContent: "center",
  },
  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "white",
    color: "black",
  },
}));
const ConfirmationPopUp = ({ slot, index }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClose = () => {
    setConfirmOpen(false);
  };
  const classes = useStyles();

  return (
    <div>
      <Button
        variant="contained"
        color="secondary"
        onClick={() => setConfirmOpen(true)}

      >Get Details</Button>
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={confirmOpen}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      {/* Details of user and slot in tabular form*/}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          padding: 10,
          width: "30vw",
          backgroundColor: "white",
          color: "black",
          borderRadius: 10,
        }}
      >
        <Typography
          variant="h4"
          style={{ color: "black", textAlign: "center" }}
        >
          Slot Booked Successfully
        </Typography>
        <div className={classes.field}>
          <Typography variant="h6" style={{ color: "black" }}>
            Name:
          </Typography>
          <Typography variant="h6" style={{ color: "black" }}>
            {auth.currentUser.displayName || "Username"}
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography variant="h6" style={{ color: "black" }}>
            Email:
          </Typography>
          <Typography variant="h6" style={{ color: "black" }}>
            {auth.currentUser.email}
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography variant="h6" style={{ color: "black" }}>
            Slot:
          </Typography>
          <Typography variant="h6" style={{ color: "black" }}>
            {slot.timings[index]}
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography variant="h6" style={{ color: "black" }}>
            Date:
          </Typography>
          <Typography variant="h6" style={{ color: "black" }}>
            {new Date().toISOString().slice(0, 10)}
          </Typography>
        </div>
        <div className={classes.field}>
          <Typography variant="h6" style={{ color: "black" }}>
            Vaccine
          </Typography>
          <Typography variant="h6" style={{ color: "black" }}>
            {slot.vaccine}
          </Typography>
        </div>
      </div>
    </Modal>
    </div>
  );
};

export default ConfirmationPopUp;
