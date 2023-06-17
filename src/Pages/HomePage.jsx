import React from "react";
import AboutUs from "./HomeComponents/AboutUs";
import { makeStyles } from "@material-ui/core";
import Precautions from "./HomeComponents/Precautions";
import Covid19 from "./HomeComponents/Covid19";
import BookingPage from "./HomeComponents/BookingPage";


const HomePage = (sectionId) => {
  

   


  
  
  
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
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <section id="booking">
        <BookingPage />
      </section>
      <section id="covid19">
        <Covid19 />
      </section>
      <section id="precautions">
        <Precautions />
      </section>

      <section id="aboutUs">
        <AboutUs />
      </section>
    </div>
  );
};

export default HomePage;
