import React from "react";
import { NavLink } from "react-router-dom";
import MenuList from "./MenuList";
import { useSelector } from "react-redux";

const Sidebar = ({ menu }) => {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role?.roleName;

  const filteredMenu = MenuList.filter((item) =>
    item.allowedRoles.includes(role)
  );

  return (
    // <div className={`flex flex-col bg-white h-dvh w-80 shadow-lg ${menu?'block':'hidden'}`}>
    // <div
    //   className={`flex flex-col bg-white h-230 h-full shadow-lg w-80 relative
    //   transition-all duration-300 ease-in-out
    //   ${menu ? "translate-x-0 opacity-100 " : "-translate-x-full opacity-0 "}
    // `}
    // >
    <div
      className={`flex flex-col bg-white shadow-lg h-[calc(100vh-75px)]
        transition-all duration-300 ease-in-out
        ${menu ? "w-80" : "w-18"}
      `}
    >
      <ul className="flex flex-col gap-2 p-4">
        {filteredMenu.map((item) => (
          <li key={item.id}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded-lg text-nowrap
                 hover:bg-gray-100 transition-all duration-200 
                 ${
                   isActive
                     ? "bg-blue-100 text-blue-600 font-semibold"
                     : "text-black"
                 }`
              }
            >
              <img src={item.logo} alt="icon" className="w-7 h-7" />
              <span
                className={`font-bold text-sm transition-all duration-400 ease-in-out ${
                  menu
                    ? "translate-x-0 opacity-100 "
                    : "-translate-x-full opacity-0 "
                }`}
              >
                {item.title}
              </span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
