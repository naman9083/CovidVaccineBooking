import { createContext, useContext, useEffect, useState } from "react";



const Covid19 = createContext();

const CovidContext = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });
  const [isLoggedin, setLoggedin] = useState(false);
  const [userData, setUserData] = useState({});
  const [admin, setAdmin] = useState(false);
  const [isUser, setUser] = useState(false);
  const [stateId, setStateId] = useState("Andhra Pradesh");
  const [confirmOpen, setConfirmOpen] = useState(false);
  // useEffect(() => {
  //   //check firebase user
  //   if(auth.currentUser){
  //     setLoggedin(true);
  //   const useRef = doc(db, "users", auth.currentUser.uid).then((docSnap) => {
  //     if (docSnap.exists()) {
  //       setUserData(docSnap.data());
  //       if (docSnap.data().role === "admin") {
  //         setAdmin(true);
  //         window.location.replace("/admin");
  //       } else {
  //         setUser(true);
  //         setAdmin(false);
  //         // window.location.replace("/");
  //       }
  //     }
  //   });
  //   console.log(isLoggedin);
  //   return useRef;
  // }
  // }, );

    

  // }, []);
  useEffect(() => {
    //check firebase user
    const credentials = JSON.parse(localStorage.getItem("user"));

    if (credentials) {
      setLoggedin(true);
      setUserData(credentials);
      if (credentials.role === "admin" || admin) {
        setAdmin(true);
      } else {
        setUser(true);
        setAdmin(false);
        // window.location.replace("/");
      }
    }
  }, [admin]);

 
  return (
    <Covid19.Provider
      value={{
        alert,
        setAlert,
        admin,
        setAdmin,
        isUser,
        setUser,
        isLoggedin,
        setLoggedin,
        userData,
        setUserData,
        stateId,
        setStateId,
        confirmOpen,
        setConfirmOpen,
      }}
    >
      {children}
    </Covid19.Provider>
  );
};
export default CovidContext;

export const CovidState = () => {
  return useContext(Covid19);
};
