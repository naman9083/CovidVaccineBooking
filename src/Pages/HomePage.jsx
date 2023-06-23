import React, { useEffect, useState } from "react";
import {
  Typography,
  makeStyles,
  Button,
  Chip,
  LinearProgress,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  MenuItem,
} from "@material-ui/core";
import {
  query,
  getDoc,
  where,
  setDoc,
  getDocs,
  doc,
  collection,
} from "@firebase/firestore";
import { db } from "../Firebase";
import { CovidState } from "../Config/CovidContext";
import covid19 from "../Images/covid19.png";

const covi = makeStyles(() => ({
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
    width: "100%",
    fontFamily: "Roboto",

    fontSize: "40px",
    color: "#000",
    backgroundColor: "#edffff",
  },
}));

const aboutUsStyles = makeStyles(() => ({
  left: {
    width: "50%",
    padding: 20,

    fontFamily: "Roboto",
    fontSize: "20px",
    color: "#000",
  },
  right: {
    width: "50%",
    padding: 20,

    fontFamily: "Roboto",
    fontSize: "20px",
    color: "#fff",
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#edffff",
  },
  about: {
    width: "100%",

    textAnchor: "middle",

    fontFamily: "Roboto",
    fontSize: "20px",
    color: "#000",
  },
}));

const precauseStyles = makeStyles(() => ({
  //left image
  left: {
    width: "50%",
    display: "flex",
    alignItems: "center",
    padding: 20,
  },
  right: {
    width: "50%",
    color: "#000",

    wordWrap: "break-word",
    padding: 20,
    textAnchor: "middle",
    fontFamily: "Roboto",
    fontSize: "20px",
  },
  main: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: "100vh",
  },
  about: {
    width: "100%",

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
  //
}));
const bookingStyles = makeStyles(() => ({
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
const HomePage = () => {
  const bookingStyle = bookingStyles();
  const precautionS = precauseStyles();
  const [state, setState] = useState("Select");
  const [city, setCity] = useState([]);
  const [states, setStates] = useState([]);
  const [centre, setCentre] = useState("");
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
                  
                  setAlert({
                    open: true,
                    message: "Slot Booked Successfully",
                    type: "success",
                  });
                  setCentreDetails({ ...centreDetails, slots: newCount });
                  setIndex((index + 1) % 6);

                  setConfirmOpen(true);
                }
              );
            } else {
              setAlert({
                open: true,
                message: "No Vaccination Center Found",
                type: "error",
              });
              
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
  const about = aboutUsStyles();
  const coviStyle = covi();
  return (
    <div>
      <div id="/" className={bookingStyle.main}>
        <center>
          <Typography
            className={bookingStyle.title}
            variant="h4"
            component="div"
          >
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
                  placeholder="Select City"
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
                width: "100%",
              }}
            >
              <TableContainer component={Paper}>
                <Table className={bookingStyle.table} aria-label="simple table">
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
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "20px",
                width: "100%",
              }}
            ></div>
          )}
          {/* {centreLoading ? (
            <></>
          ) : (
            <ConfirmationPopUp slot={centreDetails} index={index} />
          )} */}
        </center>
      </div>

      <div id="covid19" className={coviStyle.main}>
        <div className={coviStyle.left}>
          <Typography variant="h3" component="div" gutterBottom>
            COVID-19
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            COVID-19, also known as coronavirus disease 2019, is a respiratory
            illness caused by a virus called SARS-CoV-2. The virus spreads
            through respiratory droplets produced when an infected person coughs
            or sneezes. Symptoms of COVID-19 can include fever, cough, shortness
            of breath, fatigue, muscle aches, headache, sore throat, loss of
            taste or smell, and diarrhea. Some people may experience no symptoms
            at all. The best way to protect yourself from COVID-19 is to get
            vaccinated. Vaccination can help to prevent you from getting sick,
            and if you do get sick, it can help to reduce the severity of your
            illness. Other ways to protect yourself from COVID-19 include
            wearing a mask, washing your hands often, and avoiding close contact
            with people who are sick. If you think you may have COVID-19, it is
            important to get tested. Testing can help to identify people who are
            infected with the virus and help to prevent the spread of the virus.
            COVID-19 is a serious illness, but it is important to remember that
            most people who get sick will recover. By following the precautions
            listed above, you can help to protect yourself and others from
            COVID-19.
          </Typography>
        </div>
        <div className={coviStyle.right}>
          <img src={covid19} width="50%" height="100%" alt="" />
        </div>
      </div>

      <div id="precautions" className={precautionS.main}>
        <div className={precautionS.left}>
          <img
            src="https://www.cowin.gov.in/assets/images/Precaution_dose.svg"
            alt=""
          />
        </div>
        <div className={precautionS.right}>
          <Typography variant="h3" component="div" gutterBottom>
            Precautions from COVID-19
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            <ul style={{ listStyleType: "none" }}>
              <li className={precautionS.listItem}>
                Get vaccinated. The COVID-19 vaccine is the best way to protect
                yourself from the virus.
              </li>
              <li className={precautionS.listItem}>
                Wear a mask. Wearing a mask helps to prevent the spread of the
                virus by catching respiratory droplets that may contain the
                virus.
              </li>
              <li className={precautionS.listItem}>
                Get vaccinated. The COVID-19 vaccine is the best way to protect
                yourself from the virus.
              </li>
              <li className={precautionS.listItem}>
                Wash your hands often: Washing your hands with soap and water
                for at least 20 seconds helps to remove any virus that may be on
                your hands.{" "}
              </li>
              <li className={precautionS.listItem}>
                Avoid close contact with people who are sick. If you can, avoid
                close contact with people who are sick. If you must be in close
                contact with someone who is sick, wear a mask and wash your
                hands often.
              </li>
              <li className={precautionS.listItem}>
                Stay home when you are sick. If you are sick, stay home from
                work, school, and other activities. This will help to prevent
                the spread of the virus to others.
              </li>
            </ul>
          </Typography>
        </div>
      </div>

      <div id="aboutUs" className={about.main}>
        <div className={about.left}>
          <Typography variant="h3" component="div" gutterBottom>
            Our Mission
          </Typography>
          <Typography variant="h6" component="div" gutterBottom>
            The COVID‐19 pandemic is still threatening the world. A vaccine is a
            great hope to find a solution to control the virus infection. Many
            coronavirus vaccines are now available. However, to be effective, a
            vaccine must be acceptable and usable among the majority of the
            population.Our mission is to provide accurate and up-to-date
            information about vaccines to the public, in order to increase
            vaccination rates and protect people from preventable diseases
          </Typography>
        </div>
        <div className={about.right}>
          <img
            src="https://www.cowin.gov.in/assets/images/partners_page.svg"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
