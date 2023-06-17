import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { CovidState } from "../Config/CovidContext";

import { doc, setDoc } from "@firebase/firestore";
import { db } from "../Firebase";

const SignUp = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const { setAlert, setLoggedin } = CovidState();

  const handleSubmit = async () => {
    if (password !== confirmPassword) {
      setAlert({
        type: "error",
        message: "Passwords do not match",
        open: true,
      });
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
 
        const id = auth.currentUser.uid;
        const userRef = doc(db, "users", id);
        await setDoc(userRef, {
          username: username,
          email: email,
          id: id,
          role: "user",
          vaccineCount: 0,
          boosterCount: 0,
          vaccineDate: "",
          boosterDate: "",
        });
        const data ={
          username:auth.currentUser.displayName,
          email:auth.currentUser.email,
          id:auth.currentUser.uid,
          role:"user"
  
  
        }
        localStorage.setItem("user", JSON.stringify(data));
        
      
      setLoggedin(true);

      setAlert({
        type: "success",
        message: "Sign Up Successfull. Welcome to CoviFree",
        open: true,
      });
      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };
  return (
    <Box
      p={3}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <TextField
        label="Enter Name"
        type="text"
        variant="outlined"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Email"
        type="email"
        required
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Password"
        type="password"
        required
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <TextField
        label="Confirm Password"
        type="password"
        variant="outlined"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{
          backgroundColor: "gold",
          color: "black",
          fontFamily: "Montserrat",
          fontWeight: 700,
        }}
        onClick={handleSubmit}
      >
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;

// 1 2 3 4 5 6
// 1 2 3 4
