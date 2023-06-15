import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useState } from "react";
import { states } from "../../Config/states";
import { cities } from "../../Config/cities";
const BookingPage = () => {
  const useStyles = makeStyles(() => ({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 20,
      height: "90vh",
      paddingLeft: 20,
      paddingRight: 20,
      maxWidth: "98%",
      fontFamily: "Roboto",
      fontSize: "40px",
      color: "#fff",
      backgroundColor: "#fff",
    },
    title: {
      color: "#017e7e",
      fontWeight: "bold",
      flex: 1,
      cursor: "pointer",
      fontSize: "40px",
    },
  }));
  const classes = useStyles();
  const [state, setState] = useState("Andhara Pradesh");
  const [city, setCity] = useState([]);
  const [district, setDistrict] = useState("Anantapur");
  const handleStateChange = (event) => {
    setState(event.target.value);
    setCity(cities[event.target.value]);
  };
  const handleCityChange = (event) => {
    setDistrict(event.target.value);
  };

  return (
    <section id="booking" className={classes.main}>
      <center>
        <Typography className={classes.title} variant="h4" component="div">
          Search Your Nearest Vaccination Center
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            justifyContent: "center",
            margin: "20px",
          }}
        >
          <Select
            variant="outlined"
            value={state}
            maxRows={1}
            margin="dense"
            onChange={handleStateChange}
            style={{
              width: 200,
              marginRight: 10,
              color: "black",
              height: 40,
            }}
          >
            {states.map((state) => (
              <MenuItem key={state.label} value={state.value}>
                {state.label}
              </MenuItem>
            ))}
          </Select>
          <Select
            variant="outlined"
            value={district}
            onChange={handleCityChange}
            maxRows={1}
            margin="dense"
            style={{
              width: 200,
              marginRight: 10,
              color: "black",
              height: 40,
            }}
          >
            {city.map((c) => (
              <MenuItem key={c} value={c}>
                {c}
              </MenuItem>
            ))}
          </Select>
        </div>
        {/* button to search */}
        <Button
          variant="contained"
          color="secondary"
          onAbort={() => {
            handleSearch();
          }}
          style={{
            width: 200,
            marginRight: 10,
            color: "white",
            borderRadius: 20,
            height: 40,
          }}
        >
          Search
        </Button>
      </center>
    </section>
  );
};

export default BookingPage;
