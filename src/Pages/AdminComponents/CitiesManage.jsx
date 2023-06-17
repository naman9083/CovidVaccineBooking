import {
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
import React, { useState } from "react";
import { cities } from "../../Config/cities";
import { makeStyles } from "@mui/styles";
import { CovidState } from "../../Config/CovidContext";
import { Pagination } from "@mui/material";
import { doc, setDoc, deleteDoc } from "@firebase/firestore";
import { db } from "../../Firebase";

const useStyles = makeStyles({
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
  main: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "column",
    gap: 10,
    paddingLeft: 20,
    paddingRight: 20,
    minHeight: "20vh",
    maxheight: "70vh",
    width: "98%",
    marginTop: 20,

    fontFamily: "Roboto",
    fontSize: "40px",
    color: "#fff",
    backgroundColor: "#fff",
  },
});
const CitiesManage = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);
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

  ]
  ;
  const { stateId, setAlert } = CovidState();
  const handleAdd = async (id) => {
    try {
      setLoading(true);
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
          centre: centre[index],
        timings: [
          
            "10 AM - 11 AM",
            "11 AM - 12 PM",
            "12 PM - 1 PM",
            "1 PM - 2 PM",
            "2 PM - 3 PM",
            "3 PM - 4 PM",
            "4 PM - 5 PM",

          
        ],
          available: "true" ,
          vaccine: "covishield",
      });
      setAlert({
        open: true,
        message: "City added successfully",
        type: "success",
      });
      setLoading(false);
      setIndex((index + 1)%index.length);
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
    }
  };
  const handleDelete = async (id) => {
    const docRef = doc(db, "cities", id);

    try {
      setLoading(true);
      await deleteDoc(docRef);
      setAlert({
        open: true,
        message: "City deleted successfully",
        type: "success",
      });
      setLoading(false);
    } catch (e) {
      setAlert({
        open: true,
        message: e.message,
        type: "error",
      });
    }
  };

  const classes = useStyles();
  return (
    <div className={classes.main}>
     <p
     style={{
        color: "red",
        fontWeight: "700",
        fontSize: "20px",
        fontFamily: "Montserrat",

     }}
     >Note! You have to Select State to Manage Cities</p>
      <TableContainer component={Paper}>
        {loading ? (
          <LinearProgress style={{ backgroundColor: "gold" }} />
        ) : (
          <Table className={classes.table} aria-label="simple table">
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
                .slice((page - 1) * 6, (page - 1) * 6 + 6)
                .map((city) => (
                  <TableRow key={city} className={classes.row}>
                    <TableCell
                      component="th"
                      scope="row"
                      className={classes.rowName}
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
                          handleAdd(city);
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
                          handleDelete(city);
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
        }}
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(450, 900);
        }}
      />
    </div>
  );
};

export default CitiesManage;
