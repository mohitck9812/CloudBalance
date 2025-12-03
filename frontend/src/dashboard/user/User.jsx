import React from "react";
import UserTable from "./UserTable";
import { NavLink, Outlet } from "react-router-dom";
import BreadCrumbs from "../../component/BreadCrumbs";

const User = () => {
  return (
    <>
      <div> 
        <div className="h-[88vh] bg-black/10 p-5 flex flex-col gap-5 cursor-default">
        <div>
          <BreadCrumbs folder={["User"]}/>
          <div className="flex justify-between">
            <h1 className="font-bold text-4xl ">Users</h1>
            <div>
              {/* right space for section like 2 factor authentication which is hsown in main site */}
            </div>
          </div>
          </div>

          <div className="bg-white py-4 px-2 flex flex-col gap-3">
            <div className="flex gap-4 px-3">
              <NavLink to="/dashboard/user/create">
                <button className="bg-blue-700 p-1.5 text-sm text-white rounded hover:cursor-pointer">
                  {" "}
                  + Add New User{" "}
                </button>{" "}
              </NavLink>
              {/* <div className='border-2 '></div> */}
              <button className="text-sm"> Reset Filter </button>
            </div>

            <div>
              <UserTable />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;
