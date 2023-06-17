import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Button, Typography } from "@material-ui/core";

import AdminLogin from "./adminLogin";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    borderRadius: 10,
    color: "white",
    backgroundColor: theme.palette.background.paper,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textalign: "center",
    gap: 20,
    fontSize: 20,
  },
  customButton: {
    marginLeft: 10,
    cursor: "pointer",
    borderRadius: 10,
    width: 100,

    textalign: "center",
    maxWidth: 200,
    border: "2px solid #fff",
    padding: 5,
    color: "#fff",
    "&:hover": {
      fontWeight: "bold",
      color: "orange",
      border: "2px solid orange",
    },
  },
}));

const AdminAuthModal = () => {
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
      <Button
        variant="outlined"
        className={classes.customButton}
        onClick={handleOpen}
      >
        Admin
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
        <Fade in={open}>
          <div className={classes.paper}>
            <AppBar
              position="static"
              style={{ backgroundColor: "transparent", color: "black" }}
              title="Login"
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                  padding: 10,
                  backgroundColor: "transparent",
                  color: "black",
                }}
              >
                <Typography variant="h6" style={{ color: "black" }}>
                  Admin Login
                </Typography>
              </div>
            </AppBar>
            <AdminLogin
              handleClose={handleClose}
              setOpen={setOpen}
            ></AdminLogin>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AdminAuthModal;
