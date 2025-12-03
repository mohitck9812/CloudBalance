import clsx from "clsx";
import Roles from "./component/Roles";
import editIcon from "./component/EditIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Trash from "../../assets/trash.svg"
import { useContext } from "react";
import { dummyData } from "../../context/AuthContext";

const UserTable = () => {
  const navigate = useNavigate();
  const {userData:data, setUserData:setData} = useContext(dummyData)

  function handleEdit(value){
    // console.log(value);
    navigate(`/dashboard/user/edit/${value.id}`);
  }

  return (
    <div className="w-full max-h-[67vh] overflow-x-auto p-2">
      <table className="w-full table-auto border border-gray-300 rounded-lg border-separate border-spacing-0">
        <thead className="bg-blue-100 sticky">
          <tr>
            <th className="">First Name</th>
            <th className="">Last Name</th>
            <th className="">Email ID</th>
            <th className="">Roles</th>
            <th className="">Last Login</th>
            <th className="">Action</th>
          </tr>
        </thead>

        <tbody>
          <tr
            className={clsx({
              hidden: data.length > 0,
              "table-row": data.length === 0,
            })}
          >
            <td className="p-2">—</td>
            <td className="p-2">—</td>
            <td className="p-2">—</td>
            <td className="p-2">—</td>
            <td className="p-2">—</td>
            <td className="p-2">—</td>
          </tr>

          {data.map((value, index) => {
            return (
              <tr
                key={index}
                className={clsx({
                  "bg-gray-100": index % 2 === 0,
                  "bg-gray-50": index % 2 !== 0,
                })}
              >
                <td className={clsx("p-2")}> {value.firstName}</td>
                <td className={clsx("p-2")}> {value.lastName}</td>
                <td className={clsx("p-2")}> {value.email}</td>
                <td className={clsx("p-2")}>
                  {" "}
                  <div className="flex justify-start gap-4">
                    {value.role.map((role, i) => (
                      <Roles key={i} roles={role} />
                    ))}
                  </div>
                </td>
                <td className={clsx("p-2")}>{value.loginTime} </td>
                <td className={clsx("p-2")}>
                  <div className="flex gap-3">

                  <button className="hover:cursor-pointer"
                  onClick={() => {handleEdit(value)}}>
                    {" "}
                    <img src={editIcon} />{" "}
                  </button>{" "}
                  <button className="hover:cursor-pointer" 
                  onClick={() => {
                    setData((prev)=>
                      
                      prev.filter((val, i) => val === value ? console.log(val ,i) : true)
                    )
                    // console.log(value.firstName)
                  }}>
                    <img src={Trash} />{" "}
                  </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
