import {
  Button,
  Chip,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  makeStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import {
  query,
  getDoc,
  where,
  setDoc,
  getDocs,
  doc,
  collection,
} from "@firebase/firestore";
import { db } from "../../Firebase";
import { CovidState } from "../../Config/CovidContext";
import ConfirmationPopUp from "./ConfirmationPopUp";

const BookingPage = () => {
  const useStyles = makeStyles(() => ({
    main: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap: 20,
      paddingLeft: 20,
      marginTop: 10,
      paddingRight: 20,
      minHeight: "80vh",
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
    calendar: {
      marginTop: "20px",
      marginBottom: "20px",
      color: "#000",
      fontSize: "20px",
      textDecoration: "none",
      backgroundColor: "#fff",
    },
  }));
  const classes = useStyles();
  const [state, setState] = useState("Select");
  const [city, setCity] = useState([]);
  const [centre, setCentre] = useState("");
  const [states, setStates] = useState([]);
  const [centreDetails, setCentreDetails] = useState(null);
  const [centreAvailable, setCentreAvailable] = useState(false);
  const { isLoggedin, setAlert, setConfirmOpen } = CovidState();
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const handleStateChange = async (event) => {
    setLoading(true);
    setState(event.target.value);
    const collectionRef = collection(db, "cities");
    const q = query(collectionRef, where("state", "==", event.target.value));
    const querySnapshot = await getDocs(q);
    const cities = querySnapshot.docs.map((doc) => doc.data());
    setCity(cities);
    setLoading(false);
  };
  const handleCityChange = (event) => {
    setCentre(event.target.value);
  };

  const fetchStates = () => {
    setLoading(true);
    getDocs(collection(db, "states")).then((querySnapshot) => {
      const ids = querySnapshot.docs.map((doc) => doc.data());

      setStates(ids);
      setLoading(false);
      setConfirmOpen(false);
    });

    //fetch all ids
  };

  const handleSearch = () => {
    if (isLoggedin === false) {
      setAlert({
        open: true,
        message: "Please Login to Book a Slot",
        color: "error",
      });
    } else if (isLoggedin) {
      if (state === "Select" || centre === "") {
        setAlert({
          open: true,
          message: "Please Select a Valid State and City",
          type: "warning",
        });
      } else {
        setLoading(true);
        const docRef = doc(db, "cities", centre);
        getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setCentreDetails(docSnap.data());
            setLoading(false);
            setCentreAvailable(true);
          } else {
            setAlert({
              open: true,
              message: "No Vaccination Center Found",
              type: "error",
            });
            setLoading(false);
          }
        });
      }
    }
  };

  const handleBook = () => {
    if (isLoggedin === false) {
      setAlert({
        open: true,
        message: "Please Login to Book a Slot",
        color: "error",
      });
    } else if (isLoggedin) {
      if (centreDetails === null) {
        setAlert({
          open: true,
          message: "Please Select a Valid State and City",
          type: "warning",
        });
      } else {
        setLoading(true);
        const docRef = doc(db, "cities", centre);
        // decrease the count of available slots
        if (centreDetails.slots > 0) {
          getDoc(docRef).then((docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();
              const newCount = data.slots - 1;
              const newDocRef = doc(db, "cities", centre);
              setDoc(newDocRef, { slots: newCount }, { merge: true }).then(
                () => {
                  setLoading(false);
                  setAlert({
                    open: true,
                    message: "Slot Booked Successfully",
                    type: "success",
                  });
                  setCentreDetails({ ...centreDetails, slots: newCount });
                  setIndex((index + 1)%6);

                  setConfirmOpen(true);
                }
              );
            } else {
              setAlert({
                open: true,
                message: "No Vaccination Center Found",
                type: "error",
              });
              setLoading(false);
            }
          });
        }
      }
    }
  };
  useEffect(() => {
    const unsubscribe = fetchStates();
    return unsubscribe;
    // eslint-disable-next-line
  }, []);

  return (
    <section id="" className={classes.main}>
      <center>
        <Typography className={classes.title} variant="h4" component="div">
          Search Your Nearest Vaccination Center
        </Typography>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "pink" }} />
        ) : (
          <>
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
                {states.map((row) =>
                  row.status ? (
                    <MenuItem key={row.name} value={row.name}>
                      {row.name}
                    </MenuItem>
                  ) : (
                    <></>
                  )
                )}
              </Select>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={centre}
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
                {city.sort().map((c) => (
                  <MenuItem key={c.id} value={c.id}>
                    {c.id}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
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
          </>
        )}
        {centreAvailable ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              margin: "20px",
            }}
          >
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    {["Centre Name", "Vaccine", "Slots", "Status"].map(
                      (head) => (
                        <TableCell
                          style={{
                            color: "black",
                            fontWeight: "700",
                            fontSize: "20px",
                            fontFamily: "Montserrat",
                          }}
                          key={head}
                          align={head === "Centre Name" ? "inherit" : "right"}
                        >
                          {head}
                        </TableCell>
                      )
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                      }}
                      align="inherit"
                    >
                      {centreDetails.centre}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                      }}
                      align="right"
                    >
                      {centreDetails.vaccine}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                      }}
                      align="right"
                    >
                      {centreDetails.slots}
                    </TableCell>
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                      }}
                      align="right"
                    >
                      {centreDetails.available === "true" ? (
                        <Chip
                          label="Available"
                          style={{
                            backgroundColor: "green",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "20px",
                            fontFamily: "Montserrat",
                          }}
                        />
                      ) : (
                        <Chip
                          label="Not Available"
                          style={{
                            backgroundColor: "red",
                            color: "white",
                            fontWeight: "700",
                            fontSize: "20px",
                            fontFamily: "Montserrat",
                          }}
                        />
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleBook();
              }}
              style={{
                width: 200,
                marginRight: 10,
                color: "white",
                borderRadius: 20,
                height: 40,
                marginTop: 20,
              }}
            >
              Book
            </Button>
           {loading?<></>: <ConfirmationPopUp slot={centreDetails} index={index} />}
          </div>
        ) : (
          <></>
        )}
      </center>
    </section>
  );
};

export default BookingPage;
