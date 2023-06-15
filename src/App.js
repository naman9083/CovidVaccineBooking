import React from "react";

import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Header from "./Components/header";
import Alert from "./Components/Alert";
import HomePage from "./Pages/HomePage";
const App = () => {
  const useStyles = makeStyles({
    App: {
      backgroundColor: "#f5f5f5",
      color: "white",
      minHeight: "100vh",
    },
  });
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
      <HomePage />
      <Alert />
    </div>
  );
};

export default App;
