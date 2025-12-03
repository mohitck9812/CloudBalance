import React, { useState } from "react";
import Content from "./content/Content";
import Header from "../component/header/Header"

const Dashboard = () => {
  const [sideBar, setSideBar] = useState(true);

  return (
    <div className="w-dvw h-dvh flex flex-col justify-between overflow-y-clip">
      <Header menu={sideBar} setMenu={setSideBar} />
      <Content menu={sideBar} />
    </div>
  );
};

export default Dashboard;
