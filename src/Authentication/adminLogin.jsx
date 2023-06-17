import { Box, Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase";
import { CovidState } from "../Config/CovidContext";
import { doc, getDoc } from "@firebase/firestore";
import { db } from "../Firebase";

const AdminLogin = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAlert ,setAdmin} = CovidState();
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
      const id = auth.currentUser.uid;
      const userRef = doc(db, "users", id);
      await getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          if (docSnap.data().role !== "admin") {
            setAlert({
              type: "error",
              message: "You are not an admin",
              open: true,
            });
            

            return;
          }
          else{
            const data={
              username: docSnap.data().username,
              email: docSnap.data().email,
              id: docSnap.data().id,
              role: docSnap.data().role,
              

            }
            setAdmin(true);
            localStorage.setItem("user", JSON.stringify(data));
            window.location.replace("/admin");

          }
        }
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

export default AdminLogin;
