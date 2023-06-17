import React from "react";

import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const Precautions = () => {
  const useStyles = makeStyles(() => ({
    //left image
    left: {
      width: "30%",
      display: "flex",
      alignItems: "center",
    },
    right: {
      width: "50%",
      color: "#000",

      wordWrap: "break-word",

      textAlign: "justify",
      textAnchor: "middle",
      fontFamily: "Roboto",
      fontSize: "20px",
    },
    main: {
      display: "flex",
      justifyContent: "space-around",
      flexDirection: "row",
      alignItems: "center",
      height: "100vh",
    },
    about: {
      width: "100%",
      textAlign: "justify",
      textAnchor: "middle",

      fontFamily: "Roboto",
      fontSize: "20px",
      color: "#000",
    },
    listItem: {
      // change bullet color
      "&::before": {
        content: '"✓"',
        color: "green",
        fontSize: "20px",
        fontWeight: "bold",
        marginRight: "10px",
      },
    },
  }));
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <div className={classes.left}>
        <img
          src="https://www.cowin.gov.in/assets/images/Precaution_dose.svg"
          alt=""
        />
      </div>
      <div className={classes.right}>
        <Typography
          textAlign={"justify"}
          variant="h3"
          component="div"
          gutterBottom
        >
          Precautions from COVID-19
        </Typography>
        <Typography
          textAlign={"justify"}
          variant="h6"
          component="div"
          gutterBottom
        >
          <ul style={{ listStyleType: "none" }}>
            <li className={classes.listItem}>
              Get vaccinated. The COVID-19 vaccine is the best way to protect
              yourself from the virus.
            </li>
            <li className={classes.listItem}>
              Wear a mask. Wearing a mask helps to prevent the spread of the
              virus by catching respiratory droplets that may contain the virus.
            </li>
            <li className={classes.listItem}>
              Get vaccinated. The COVID-19 vaccine is the best way to protect
              yourself from the virus.
            </li>
            <li className={classes.listItem}>
              Wash your hands often: Washing your hands with soap and water for
              at least 20 seconds helps to remove any virus that may be on your
              hands.{" "}
            </li>
            <li className={classes.listItem}>
              Avoid close contact with people who are sick. If you can, avoid
              close contact with people who are sick. If you must be in close
              contact with someone who is sick, wear a mask and wash your hands
              often.
            </li>
            <li className={classes.listItem}>
              Stay home when you are sick. If you are sick, stay home from work,
              school, and other activities. This will help to prevent the spread
              of the virus to others.
            </li>
          </ul>
        </Typography>
      </div>
    </div>
  );
};

export default Precautions;
