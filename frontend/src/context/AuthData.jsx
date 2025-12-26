import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { authData } from "./AuthContext";

const AuthData = ({ children }) => {
  // const [module, setModule] = useState("Lens");

  const state = {
    id:"",
    active:"",
    email: "",
    firstName : "",
    lastLogin: "",
    role: {
      id:"",
      roleName:""
    }
  }

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")) || state);
  
  return <authData.Provider value={{user,setUser}}>{children}</authData.Provider>;
};

export default AuthData;
