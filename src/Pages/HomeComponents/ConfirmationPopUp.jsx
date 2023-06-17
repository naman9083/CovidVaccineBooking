import { Backdrop, Modal, Typography } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import React from "react";
import { auth } from "../../Firebase";
import { CovidState } from "../../Config/CovidContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "transparent",
    justifyContent: "center",
  },
  field: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
    padding: 10,
    width: "100%", 
    backgroundColor: "transparent",
    color: "black",
  },
}));
const ConfirmationPopUp = ({ slot, index }) => {
  const { confirmOpen, setConfirmOpen } = CovidState();

  const handleClose = () => {
    setConfirmOpen(false);
  };
  const classes = useStyles();

  return (
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
          style={{ color: "black", textalign: "center" }}
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
  );
};

export default ConfirmationPopUp;
