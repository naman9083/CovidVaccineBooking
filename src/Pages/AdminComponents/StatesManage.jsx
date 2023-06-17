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
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Pagination } from "@mui/material";
import { doc, getDocs, setDoc, collection } from "@firebase/firestore";
import { db } from "../../Firebase";
import { CovidState } from "../../Config/CovidContext";
import { useNavigate } from "react-router-dom";

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
const StatesManage = () => {
  const navigate = useNavigate();

  const [states, setState] = useState([]);
  const { setAlert, admin, setStateId } = CovidState();
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const fetchStates =  () => {
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
  return (
    <div className={classes.main}>
     

     
       
      <TableContainer component={Paper}>
      {loading ? (
          <LinearProgress style={{ backgroundColor: "pink" }} />
        ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
            {states.slice((page - 1) * 6, (page - 1) * 6 + 6).map((row) => (
              <TableRow
                key={row.name}
                className={classes.row}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.rowName}
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
        classes={{ ul: classes.pagination }}
        onChange={(_, value) => {
          setPage(value);
          window.scroll(0, 450);
        }}
      />
    </div>
  );
};

export default StatesManage;
