import { createContext, useContext, useState } from "react";

// import { auth, db } from "../Firebase";


const Covid19 = createContext();

const CovidContext = ({ children }) => {
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success",
      });
      

    return ( <Covid19.Provider value={{ alert, setAlert,
    }}>
        {children}
    </Covid19.Provider>)

    }
export default CovidContext;


export const CovidState = () => {
    return useContext(Covid19);
  }