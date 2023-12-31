import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { CovidState } from "../Config/CovidContext";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert } = CovidState();
  
  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        type: "error",
        message: "Please enter all the fields",
        open: true,
      });
      return;
    }
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        type: "success",
        message: `Login Successfull. Welcome ${result.user.email} to CoviFree`,
        open: true,
      });
      const data ={
        username:result.user.displayName,
        email:result.user.email,
        id:result.user.uid,
        role:"user"


      }
      localStorage.setItem("user", JSON.stringify(data));

      handleClose();
      window.location.reload();
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
        label="Enter Email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        label="Enter Password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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
        Login
      </Button>
      
    </Box>
  );
};

export default Login;
