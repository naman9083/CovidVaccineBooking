import React, { useState } from "react";

import { CovidState } from "../Config/CovidContext";
import StatesManage from "./AdminComponents/StatesManage";
import { AppBar, Tab, Tabs, Typography } from "@material-ui/core";
import CitiesManage from "./AdminComponents/CitiesManage";
import { makeStyles } from "@mui/styles";
const styles = makeStyles({
  tabs: {
    "& .MuiTab-textColorInherit.Mui-selected": {
      color: "#f51348",
      fontWeight: "bold",
    },
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
});

const AdminPanel = () => {
  const { admin } = CovidState();
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const Cls = styles();

  return admin ? (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "column",

        color: "#000",
        width: "100%",
      }}
    >
      <Typography
        textalign={"justify"}
        variant="h3"
        component="div"
        gutterBottom
        style={{
          color: "#f51348",
          fontWeight: "700",
        }}
      >
        Admin Panel
      </Typography>
      <center>
        <AppBar
          position="static"
          style={{ backgroundColor: "#fff", color: "black", boxShadow: "none" }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Manage States" className={Cls.tabs} />
            <Tab label="Manage Citites" className={Cls.tabs} />
          </Tabs>
        </AppBar>
      </center>
      {value === 0 && <StatesManage />}
      {value === 1 && <CitiesManage />}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        color: "#000",
      }}
    >
      <Typography variant="h4">Un-Authorised</Typography>
    </div>
  );
};

export default AdminPanel;
