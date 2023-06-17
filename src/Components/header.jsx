import React, { useState } from "react";
import logo from "../Images/logo.png";
import {
  AppBar,
  Button,
  Container,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import { auth } from "../Firebase";
import AuthModal from "../Authentication/AuthModal";
import AdminAuthModal from "../Authentication/AdminAuthModal";
import { CovidState } from "../Config/CovidContext";
const useStyles = makeStyles({
  toolbar: {
    width: "100%",
    backgroundColor: "#017e7e",
    color: "#fff",
  },
  Box: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#017e7e",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    flex: 1,
    cursor: "pointer",
  },
  logo: {
    width: 100,
    cursor: "pointer",
  },
  otherFields: {
    display: "flex",
    alignSelf: "right",
    alignItems: "center",
    justifyContent: "space-around",
    cursor: "pointer",

    fontFamily: "Roboto",
    width: "50%",

    fontSize: "40px",

    fontWeight: "bold",
  },
  TextButton: {
    "&:hover": {
      // light shade of the backgroundColor
      color: "orange",
    },
  },
  logoBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "#017e7e",
    minwidth: "20%",
    flexDirection: "row",
  },
});
const Header = () => {
  const [selectedOption, setSelectedOption] = useState("booking");

  const ScrollTopage = (id) => {
    //home page

    setSelectedOption(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("/");
    auth.signOut();
  };
  const { admin, isLoggedin } = CovidState();

  const navigate = useNavigate();
  const classes = useStyles();
  

  return (
    <AppBar className={classes.toolbar} position="static">
      <Container className={classes.Box}>
        <div className={classes.logoBox}>
          {/* About Us text */}
          <Typography variant="h6" display={admin ? "none" : "block"}>
            {admin ? "Hello! Admin" : "Hello! User"}
          </Typography>

          <img src={logo} alt="logo" className={classes.logo} />
          <Typography
            variant="h6"
            onClick={
              admin
                ? () => {
                    navigate("/admin");
                  }
                : () => {
                    navigate("/");
                  }
            }
            className={classes.title}
          >
            Covi-Free
          </Typography>
        </div>

        {/* Other Fields */}
        <div className={classes.otherFields}>
          <div
            style={{
              display: admin ? "none" : "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              backgroundColor: "#017e7e",
              width: "100%",
            }}
          >
            <Typography
              variant="h6"
              className={classes.TextButton}
              onClick={() => {
                ScrollTopage("");
              }}
              style={
                selectedOption === "" ? { textDecoration: "underline" } : {}
              }
            >
              Book Slot
            </Typography>
            <Typography
              variant="h6"
              className={classes.TextButton}
              onClick={() => {
                ScrollTopage("covid19");
              }}
              style={
                selectedOption === "covid19"
                  ? { textDecoration: "underline" }
                  : {
                      textDecoration: "none",
                    }
              }
            >
              COVID-19
            </Typography>
            <Typography
              variant="h6"
              className={classes.TextButton}
              onClick={() => {
                ScrollTopage("precautions");
              }}
              style={
                selectedOption === "precautions"
                  ? { textDecoration: "underline" }
                  : {
                      textDecoration: "none",
                    }
              }
            >
              Precautions
            </Typography>

            <Typography
              variant="h6"
              className={classes.TextButton}
              onClick={() => {
                ScrollTopage("aboutUs");
              }}
              style={
                selectedOption === "aboutUs"
                  ? { textDecoration: "underline" }
                  : {
                      textDecoration: "none",
                    }
              }
            >
              About Us
            </Typography>
          </div>
          {!isLoggedin ? (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <AuthModal />
              <AdminAuthModal />
            </div>
          ) : (
            <Button variant="contained" color="secondary" onClick={logout}>
              Logout{" "}
            </Button>
          )}
        </div>
      </Container>
    </AppBar>
  );
};

export default Header;
