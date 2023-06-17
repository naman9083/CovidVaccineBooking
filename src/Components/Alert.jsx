
import React from "react";
import { Snackbar } from "@material-ui/core";
import MuiAlert from "@mui/material/Alert";
import { CovidState } from "../Config/CovidContext";

const Alert = () => {
  const { alert, setAlert } = CovidState();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlert({ open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={alert.type}
        elevation={10}
        variant="filled"
        
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
