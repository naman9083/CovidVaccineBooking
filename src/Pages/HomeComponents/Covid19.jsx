import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import covid19 from "../../Images/covid19.png";

const Covid19 = () => {
  const useStyles = makeStyles(() => ({
    left: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 20,
      padding: 20,
    },
    right: {
      width: "50%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      gap: 20,
      padding: 20,
    },
    main: {
      display: "flex",
        
      alignItems: "center",
      flexDirection: "row",
      height: "100vh",

      padding: 20,
      width: "100%",
      fontFamily: "Roboto",
      textAlign: "justify",
      fontSize: "40px",
      color: "#000",
      backgroundColor: "#edffff",
    },
  }));
  const classes = useStyles();

  return (
    <div  className={classes.main}>
      <div className={classes.left}>
        <Typography
          textAlign={"justify"}
          variant="h3"
          component="div"
          gutterBottom
        >
          COVID-19
        </Typography>
        <Typography
          textAlign={"justify"}
          variant="h6"
          component="div"
          gutterBottom
        >
          COVID-19, also known as coronavirus disease 2019, is a respiratory
          illness caused by a virus called SARS-CoV-2. The virus spreads through
          respiratory droplets produced when an infected person coughs or
          sneezes. Symptoms of COVID-19 can include fever, cough, shortness of
          breath, fatigue, muscle aches, headache, sore throat, loss of taste or
          smell, and diarrhea. Some people may experience no symptoms at all.
          The best way to protect yourself from COVID-19 is to get vaccinated.
          Vaccination can help to prevent you from getting sick, and if you do
          get sick, it can help to reduce the severity of your illness. Other
          ways to protect yourself from COVID-19 include wearing a mask, washing
          your hands often, and avoiding close contact with people who are sick.
          If you think you may have COVID-19, it is important to get tested.
          Testing can help to identify people who are infected with the virus
          and help to prevent the spread of the virus. COVID-19 is a serious
          illness, but it is important to remember that most people who get sick
          will recover. By following the precautions listed above, you can help
          to protect yourself and others from COVID-19.
        </Typography>
      </div>
      <div className={classes.right}>
        <img src={covid19} width="50%" height="100%" alt="" />
      </div>
    </div>
  );
};

export default Covid19;
