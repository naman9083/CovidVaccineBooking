import React from "react";

import { Route, Routes } from "react-router-dom";
import { makeStyles } from "@material-ui/styles";
import Header from "./Components/header";
import Alert from "./Components/Alert";
import HomePage from "./Pages/HomePage";
import AdminPanel from "./Pages/AdminPanel";
const useStyles = makeStyles({
  App: {
    backgroundColor: "#fff",
    color: "white",
    minHeight: "100vh",
  },
});
const App = () => {
  const classes = useStyles();
  return (
    <div className={classes.App}>
      <Header />
      <Routes>
        {/* Different section of homepage */}
        <Route path="/" exact element={<HomePage />} />

        <Route path="/admin" element={<AdminPanel />} />
      </Routes>

      <Alert />
    </div>
  );
};

export default App;
