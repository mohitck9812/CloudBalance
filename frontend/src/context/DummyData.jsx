import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { dummyData } from "./AuthContext";

const data = [
  {
    id: 1,
    firstName: "Mohit",
    lastName: "Yadav",
    role: ["Admin"],
    email: "mohit@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 2,
    firstName: "Lalit",
    lastName: "Kumar",
    role: ["Customer"],
    email: "lalit.kumar@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 3,
    firstName: "Sameer",
    lastName: "Kahan",
    role: ["Read-only"],
    email: "sameer.khan@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 4,
    firstName: "Sarthak",
    lastName: "Gupta",
    role: ["Read-only", "Customer"],
    email: "sarthak.gupta@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 5,
    firstName: "Mohit",
    lastName: "Yadav",
    role: ["Admin"],
    email: "mohit@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 6,
    firstName: "Lalit",
    lastName: "Kumar",
    role: ["Customer"],
    email: "lalit.kumar@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 7,
    firstName: "Sameer",
    lastName: "Kahan",
    role: ["Read-only"],
    email: "sameer.khan@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 8,
    firstName: "Sarthak",
    lastName: "Gupta",
    role: ["Read-only", "Customer"],
    email: "sarthak.gupta@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 9,
    firstName: "Mohit",
    lastName: "Yadav",
    role: ["Admin"],
    email: "mohit@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 10,
    firstName: "Lalit",
    lastName: "Kumar",
    role: ["Customer"],
    email: "lalit.kumar@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 11,
    firstName: "Sameer",
    lastName: "Kahan",
    role: ["Read-only"],
    email: "sameer.khan@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 12,
    firstName: "Sarthak",
    lastName: "Gupta",
    role: ["Read-only", "Customer"],
    email: "sarthak.gupta@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 13,
    firstName: "Mohit",
    lastName: "Yadav",
    role: ["Admin"],
    email: "mohit@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 14,
    firstName: "Lalit",
    lastName: "Kumar",
    role: ["Customer"],
    email: "lalit.kumar@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 15,
    firstName: "Sameer",
    lastName: "Kahan",
    role: ["Read-only"],
    email: "sameer.khan@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
  {
    id: 16,
    firstName: "Sarthak",
    lastName: "Gupta",
    role: ["Read-only", "Customer"],
    email: "sarthak.gupta@cloudkeeper.com",
    loginTime: "dekhte h",
    active: true,
  },
];

const DummyDataProvider = ({ children }) => {
  const [userData, setUserData] = useState(data);

  return (
    <dummyData.Provider value={{ userData, setUserData }}>
      {children}
    </dummyData.Provider>
  );
};

export default DummyDataProvider;
