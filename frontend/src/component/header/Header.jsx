import React from "react";
import BrandLogo from "../../assets/Cloudkeeper_New.svg";
import menuicon from "../../assets/menuIcon.svg";
import { Link } from "react-router-dom";
import Module from "./Module";
import Profile from "./Profile";
// import { authData } from "../../context/AuthContext";

const Header = ({setMenu}) => {

  // const {menuVisiblity} = useContext(authData)


  return (
    <div className="bg-white h-20 flex items-center shadow-xl z-8">


      <div className="m-10">
        <Link to={"/dashboard"}>
          <img src={BrandLogo} alt="Brand Logo" />
        </Link>
      </div>


        <button className="w-6 h-6 text-primary flex">
            <img src={menuicon} alt="menu" onClick={()=>{setMenu(prev=>!prev)}}/>
        </button>


      <div className="w-full flex flex-row justify-between p-6">
        <div> 
            <Module />
        </div>
        <div>
            <Profile />
        </div>
      </div>
    </div>
  );
};

export default Header;
