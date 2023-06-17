import { makeStyles } from "@material-ui/core";
import { Typography } from "@mui/material";
import React from "react";
const useStyles = makeStyles(() => ({
  left: {
    width: "40%",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "20px",
    color: "#000",
  },
  right: {
    width: "50%",
    textAlign: "center",
    fontFamily: "Roboto",
    fontSize: "20px",
    color: "#fff",
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#edffff",
  },
  about: {
    width: "100%",

    textAlign: "justify",
    textAnchor: "middle",

    fontFamily: "Roboto",
    fontSize: "20px",
    color: "#000",
  },
}));
const AboutUs = () => {
  
  const classes = useStyles();

  return (
    <div id="aboutUs" className={classes.main}>
      <div className={classes.left}>
        <Typography
          textAlign={"justify"}
          variant="h3"
          component="div"
          gutterBottom
        >
          Our Mission
        </Typography>
        <Typography
          textAlign={"justify"}
          variant="h6"
          component="div"
          gutterBottom
        >
          The COVID‐19 pandemic is still threatening the world. A vaccine is a
          great hope to find a solution to control the virus infection. Many
          coronavirus vaccines are now available. However, to be effective, a
          vaccine must be acceptable and usable among the majority of the
          population.Our mission is to provide accurate and up-to-date
          information about vaccines to the public, in order to increase
          vaccination rates and protect people from preventable diseases
        </Typography>
      </div>
      <div className={classes.right}>
        <img
          src="https://www.cowin.gov.in/assets/images/partners_page.svg"
          alt=""
        />
      </div>
    </div>
  );
};

export default AboutUs;
