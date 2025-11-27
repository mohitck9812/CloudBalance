import React from "react";
import Home from "../assets/homeIcon.svg";

const BreadCrumbs = ({ folder }) => {
  return (
    <div>
      <div className="flex gap-4">
        <img src={Home} alt="Home Icon" className="h-5" />
        {folder.map((val, index) => (
          <div className="flex gap-3 text-gray-500" key={index}>
            <div> &gt; </div>
            <div>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumbs;
