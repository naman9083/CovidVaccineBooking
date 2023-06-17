import React from "react";
import AboutUs from "./HomeComponents/AboutUs";
import { makeStyles } from "@material-ui/core";
import Precautions from "./HomeComponents/Precautions";
import Covid19 from "./HomeComponents/Covid19";
import BookingPage from "./HomeComponents/BookingPage";
const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    gap: 20,
    paddingLeft: 20,
    paddingRight: 20,
    maxwidth: "98%",
    fontFamily: "Roboto",
    fontSize: "40px",
    color: "#fff",
    backgroundColor: "#fff",
  },
}));
const HomePage = (sectionId) => {
  
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <BookingPage />

      <Covid19 />

      <Precautions />

      <AboutUs />
    </div>
  );
};

export default HomePage;
