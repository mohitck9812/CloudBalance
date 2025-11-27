import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { dummyData } from './AuthContext';


const data =[
    {
        firstName : "Mohit",
        lastName : "Yadav",
        role: ["Admin"],
        email : "mohit@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Lalit",
        lastName : "Kumar",
        role: ["Customer"],
        email : "lalit.kumar@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sameer",
        lastName : "Kahan",
        role: ["Read-only"],
        email : "sameer.khan@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sarthak",
        lastName : "Gupta",
        role: ["Read-only","Customer"],
        email : "sarthak.gupta@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Mohit",
        lastName : "Yadav",
        role: ["Admin"],
        email : "mohit@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Lalit",
        lastName : "Kumar",
        role: ["Customer"],
        email : "lalit.kumar@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sameer",
        lastName : "Kahan",
        role: ["Read-only"],
        email : "sameer.khan@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sarthak",
        lastName : "Gupta",
        role: ["Read-only","Customer"],
        email : "sarthak.gupta@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Mohit",
        lastName : "Yadav",
        role: ["Admin"],
        email : "mohit@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Lalit",
        lastName : "Kumar",
        role: ["Customer"],
        email : "lalit.kumar@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sameer",
        lastName : "Kahan",
        role: ["Read-only"],
        email : "sameer.khan@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sarthak",
        lastName : "Gupta",
        role: ["Read-only","Customer"],
        email : "sarthak.gupta@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Mohit",
        lastName : "Yadav",
        role: ["Admin"],
        email : "mohit@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Lalit",
        lastName : "Kumar",
        role: ["Customer"],
        email : "lalit.kumar@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sameer",
        lastName : "Kahan",
        role: ["Read-only"],
        email : "sameer.khan@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
    {
        firstName : "Sarthak",
        lastName : "Gupta",
        role: ["Read-only","Customer"],
        email : "sarthak.gupta@cloudkeeper.com",
        loginTime: "dekhte h",
        active: true,
    },
]

const DummyDataProvider = ({ children }) => {

  const [userData, setUserData] = useState(data);

  return (
    <dummyData.Provider value={{ userData, setUserData }}>
      {children}
    </dummyData.Provider>
  );
};

export default DummyDataProvider
