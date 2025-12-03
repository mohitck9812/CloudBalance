import React from "react";
import Home from "../assets/homeIcon.svg";
import { Link } from "react-router";

const BreadCrumbs = ({ folder }) => {
  return (
    <div>
      <div className="flex gap-4">
        <Link to="/"><img src={Home} alt="Home Icon" className="h-5" /></Link>
        {folder.map((val, index) => (
          <div className="flex gap-3 text-gray-500 hover:cursor-default" key={index}>
            <div> &gt; </div>
            <div>{val}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BreadCrumbs;
