import React from "react";
import Sidebar from "../sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "../../component/footer/Footer";
// import Footer from "../../component/footer/Footer";

const Content = ({ menu }) => {
  return (
    <div className="flex-1 min-h-0">
      <div className="flex h-full min-h-0">
        <Sidebar menu={menu} />

          <div className="flex flex-col bg-black/10 justify-between w-full flex-1 min-h-0 relative">
            <Outlet />
            <Footer />
          </div>
      </div>
    </div>
  );
};

export default Content;
