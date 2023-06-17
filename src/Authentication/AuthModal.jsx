import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { AppBar, Box, Button, Tab, Tabs } from "@material-ui/core";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth,db } from "../Firebase";
import { doc, setDoc } from "@firebase/firestore";
import GoogleButton from "react-google-button";
import { CovidState } from "../Config/CovidContext";
import Login from "./Login";
import SignUp from "./Signup";

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
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
  customButton: {
    marginLeft: 10,
    cursor: "pointer",
    borderRadius: 10,
    
    textAlign: "center",
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

const AuthModal = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const googleProvider = new GoogleAuthProvider();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { setAlert,setLoggedin } = CovidState();
  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then(async(result) => {
      setAlert({
        type: "success",
        message: `Logged In Successfully. Welcome ${result.user.email} to CoviFree`,
        open: true,
      });
      const id = auth.currentUser.uid;
        const userRef = doc(db, "users", id);
        await setDoc(userRef, {
          username: result.user.displayName,
          email: result.user.email,
          id: id,
          role: "user",
          vaccineCount: 0,
          boosterCount: 0,
          vaccineDate: "",
          boosterDate: "",

        });
      const data ={
        username:result.user.displayName,
        email:result.user.email,
        id:result.user.uid,
        role:"user"


      }
      localStorage.setItem("user", JSON.stringify(data));
      

      setLoggedin(true);

    }).catch((error) => {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
        });
    });
    
  };
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
       User
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
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="simple tabs example"
              >
                <Tab label="Login" />
                <Tab label="SignUp" />
           
              
              </Tabs>
            </AppBar>
            {value === 0 &&<Login handleClose={handleClose}/>}
            {value === 1 && <SignUp handleClose={handleClose} />}
            <Box className={classes.google}>
              <span style={{
                color: "black",
              }}>OR</span>
              <GoogleButton
                style={{ width: "100%", outline: "none", border: "none" }}
                onClick={() => {
                  signInWithGoogle();
                }}
              />
            </Box>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
