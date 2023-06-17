import React, { useState, useEffect } from "react";

import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Button,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import { cities } from "../Config/cities";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
} from "@firebase/firestore";
import { db } from "../Firebase";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { CovidState } from "../Config/CovidContext";


const statesStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  row: {
    backgroundColor: "#fff",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
    fontFamily: "Montserrat",
  },
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
    marginBottom: 20,
    marginTop: 20,
    width: "98%",

    fontFamily: "Roboto",
    fontSize: "40px",
    color: "#fff",
    backgroundColor: "#fff",
  },
  pagination: {
    "& .MuiPaginationItem-root": {
      color: "#f51348",
      fontWeight: "bold",
      fontSize: "20px",
    },
  },
  rowName: {
    fontFamily: "Montserrat",
    fontSize: "20px",
    width: "50%",

    color: "#f51348",
  },
});
const AdminPanel = () => {
  const [value, setValue] = useState(0);
 
  const navigate = useNavigate();
  const [states, setState] = useState([]);
  const { setAlert, admin, setStateId, stateId } = CovidState();
  const [page, setPage] = useState(1);
  const statesStyle = statesStyles();
  const [loading, setLoading] = useState(false);
  const [pageC, setPageC] = useState(1);
  const [loadingC, setLoadingC] = useState(false);
  const [indexC, setIndexC] = useState(0);
  const centre = [
    "Apollo Hospital",
    "Fortis Hospital",
    "Max Hospital",
    "Medanta Hospital",
    "AIIMS",
    "Sir Ganga Ram Hospital",
    "BLK Hospital",
    "Indraprastha Apollo Hospital",
    "Artemis Hospital",
    "Manipal Hospital",
    "Kokilaben Hospital",
    "Shaheed Bhagat Singh Nagar Hospital",
    "Ruby Hall Clinic",
    "Aster CMI Hospital",
    "Nanavati Hospital",
    "Jaslok Hospital",
  ];
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const fetchStates = () => {
    setLoading(true);
    getDocs(collection(db, "states")).then((snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.data());
      setState(ids);
      setLoading(false);
    });

    //fetch all ids
  };
  useEffect(() => {
    const unsubscribe = fetchStates();
    return unsubscribe;
  }, []);

  const handleStateAdd = async (id) => {
    if (!admin) {
      setAlert({
        open: true,
        message: "You are not Admin",
        type: "error",
      });
      navigate("/");
    } else {
      setLoading(true);
      const stateRef = doc(db, "states", id);

      try {
        await setDoc(
          stateRef,
          {
            status: true,
          },
          { merge: true }
        );
        setLoading(false);

        setAlert({
          open: true,
          message: "State Added Successfully",
          type: "success",
          duration: 3000,
        });
        window.location.reload();
      } catch (e) {
        console.log(e);
      }
    }
  };
  const handleDeleteState = async (id) => {
    if (!admin) {
      setAlert({
        open: true,
        message: "You are not Admin",
        type: "error",
        duration: 3000,
      });
      navigate("/");
    } else {
      setLoading(true);
      const stateRef = doc(db, "states", id);

      try {
        await setDoc(
          stateRef,
          {
            status: false,
          },
          { merge: true }
        );
        window.location.reload();

        setAlert({
          open: true,
          message: "State Deleted Successfully",
          type: "success",
          duration: 3000,
        });
        setLoading(false);
      } catch (e) {
        console.log(e);
      }
    }
  };

  //city

  const handleAddC = async (id) => {
    try {
      setLoadingC(true);
      const collectionRef = doc(db, "cities", id);

      await setDoc(collectionRef, {
        id: id,
        slots: 10,
        state: stateId,
        dateOfSlot: `${new Date().toISOString().slice(0, 10)}_${new Date(
          Date.now() + 6 * 24 * 60 * 60 * 1000
        )
          .toISOString()
          .slice(0, 10)}`,
        centre: centre[indexC],
        timings: [
          "10 AM - 11 AM",
          "11 AM - 12 PM",
          "12 PM - 1 PM",
          "1 PM - 2 PM",
          "2 PM - 3 PM",
          "3 PM - 4 PM",
          "4 PM - 5 PM",
        ],
        available: "true",
        vaccine: "covishield",
      });
      setAlert({
        open: true,
        message: "City added successfully",
        type: "success",
      });
      setLoadingC(false);
      setIndexC((indexC + 1) % indexC.length);
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
    }
  };
  const handleDeleteC = async (id) => {
    const docRef = doc(db, "cities", id);

    try {
      setLoadingC(true);
      await deleteDoc(docRef);
      setAlert({
        open: true,
        message: "City deleted successfully",
        type: "success",
      });
      setLoadingC(false);
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
    }
  };

  return admin ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 20,
        color: "#000",
        backgroundColor: "#fff",
        width: "100%",
      }}
    >
      <Typography
        variant="h3"
        component="div"
        gutterBottom
        style={{
          color: "#f51348",
          fontWeight: "700",
        }}
      >
        Admin Panel
      </Typography>
      <center>
        <AppBar
          position="static"
          style={{ backgroundColor: "#fff", color: "black", boxShadow: "none" }}
        >
          <Tabs value={value} onChange={handleChange}>
            <Tab label="Manage States" style={{
             
              fontSize: 20,
              height: 50,
              fontWeight: "bold",
              color: "#000",
            }}/>
            <Tab label="Manage Citites"
             style={{
             
             height: 50,
             fontSize: 20,
             fontWeight: "bold",
             color: "#000",
           }}
             />
          </Tabs>
        </AppBar>
      </center>
      {value === 0 && (
        <div className={statesStyle.main}>
          <TableContainer component={Paper}>
            {loading ? (
              <LinearProgress style={{ backgroundColor: "pink" }} />
            ) : (
              <Table sx={{ minWidth: 650 }} aria-label="simple table"
              style={{ backgroundColor: "#fff",width:"100%" }}
              >
                <TableHead>
                  <TableRow>
                    {["State", "Add", "Delete", "Status"].map((head) => (
                      <TableCell
                        style={{
                          color: "black",
                          fontWeight: "700",
                          fontSize: "20px",
                          fontFamily: "Montserrat",
                        }}
                        key={head}
                        align={head === "State" ? "inherit" : "right"}
                      >
                        {head}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {states
                    .slice((page - 1) * 6, (page - 1) * 6 + 6)
                    .map((row) => (
                      <TableRow
                        key={row.name}
                        style={{ backgroundColor: "#fff" }}
                        className={statesStyle.row}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={statesStyle.rowName}
                          //  open popup
                          onClick={() => {
                            setStateId(row.name);
                            setAlert({
                              open: true,
                              message: "State Selected",
                              type: "success",
                            });
                          }}
                        >
                          {row.name}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              handleStateAdd(row.name);
                            }}
                          >
                            Add
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              handleDeleteState(row.name);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Typography
                            style={{
                              color: row.status ? "green" : "red",
                            }}
                          >
                            {row.status ? "Active" : "Inactive"}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>

          <Pagination
            count={Number.parseInt(states.length) / 4 - 2}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
            classes={{ ul: statesStyle.pagination }}
            onChange={(_, value) => {
              setPage(value);
              window.scroll(0, 450);
            }}
          />
        </div>
      )}
      {value === 1 && (
        <div className={statesStyle.main}>
          <p
            style={{
              color: "red",
              fontWeight: "700",
              fontSize: "20px",
              fontFamily: "Montserrat",
            }}
          >
            Note! You have to Select State to Manage Cities
          </p>
          <TableContainer component={Paper}>
            {loadingC ? (
              <LinearProgress style={{ backgroundColor: "gold" }} />
            ) : (
              <Table aria-label="simple table"
              style={{ backgroundColor: "#fff",width:"100%" }}
              >
                <TableHead style={{ backgroundColor: "#fff" }}>
                  {["City", "No of slots", "Add", "Delete"].map((head) => (
                    <TableCell
                      style={{
                        color: "black",
                        fontWeight: "700",
                        fontSize: "20px",
                        fontFamily: "Montserrat",
                      }}
                      key={head}
                      align={head === "City" ? "inherit" : "right"}
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableHead>
                <TableBody>
                  {cities[stateId]
                    .sort()
                    .slice((pageC - 1) * 6, (pageC - 1) * 6 + 6)
                    .map((city) => (
                      <TableRow key={city} className={statesStyle.row}
                      style={{ backgroundColor: "#fff" }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          className={statesStyle.rowName}
                        >
                          {city}
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {}}
                          >
                            Edit
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              handleAddC(city);
                            }}
                          >
                            Add
                          </Button>
                        </TableCell>
                        <TableCell align="right">
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              handleDeleteC(city);
                            }}
                          >
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            )}
          </TableContainer>
          <Pagination
            count={Number.parseInt(cities[stateId].length / 4) - 2}
            style={{
              padding: 20,
              width: "100%",
              display: "flex",
              justifyContent: "center",
              color: "pink",
              backgroundColor: "transparent",
            }}
           
            onChange={(_, value) => {
              setPageC(value);
              window.scroll(450, 900);
            }}
          />
        </div>
      )}
    </div>
  ) : (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: 20,
        color: "#000",
      }}
    >
      <Typography variant="h4">Un-Authorised</Typography>
    </div>
  );
};

export default AdminPanel;
