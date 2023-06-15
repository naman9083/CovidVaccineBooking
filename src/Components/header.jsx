import React from "react";
import logo from "../Images/logo.png";
import {
  AppBar,
  Container,
  ThemeProvider,
  Typography,
  createTheme,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useNavigate } from "react-router-dom";
import AuthModal from "../Authentication/AuthModal";
const Header = () => {
  const ScrollTopage = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
  };

  const useStyles = makeStyles({
    toolbar: {
      width: "100%",
      backgroundColor: "#017e7e",
      color: "#fff",
    },
    Box: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexDirection: "row",
    },
    title: {
      color: "#fff",
      flex: 1,
      cursor: "pointer",
    },
    logo: {
      width: 100,
      cursor: "pointer",
    
    },
    otherFields: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      cursor: "pointer",
      gap: 10,
      fontFamily: "Roboto",
      width: "50%",
      marginRight: 10,
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
      width: "20%",
      flexDirection: "row",
    },
  });
  const navigate = useNavigate();
  const classes = useStyles();
  const lightTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "light",
    },
  });

  return (
    <ThemeProvider theme={lightTheme}>
      <AppBar className={classes.toolbar} position="sticky">
        <Container className={classes.Box}>
          <div className={classes.logoBox}>
            {/* About Us text */}

            <img src={logo} alt="logo" className={classes.logo} />
            <Typography
              variant="h6"
              onClick={() => navigate("/")}
              className={classes.title}
            >
              Covi-Free
            </Typography>
          </div>

          {/* Other Fields */}
          <div className={classes.otherFields}>
            <Typography variant="h6" className={classes.TextButton} onClick={() => {
                ScrollTopage("booking");
              }}>Book Slot</Typography>
            <Typography variant="h6" className={classes.TextButton}
              onClick={() => {
                ScrollTopage("covid19");
              }}
            >
              COVID-19
            </Typography>
            <Typography variant="h6" className={classes.TextButton}
              onClick={() => {
                ScrollTopage("precautions");
              }}
            >
              Precautions
            </Typography>

            <Typography variant="h6" className={classes.TextButton}
              onClick={() => {
                ScrollTopage("aboutUs");
              }}
            >
              About Us
            </Typography>

            <AuthModal />
          </div>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
