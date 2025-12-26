import clsx from "clsx";
import Roles from "./component/Roles";
import editIcon from "./component/EditIcon.svg";
import { NavLink, useNavigate } from "react-router-dom";
import Trash from "../../assets/trash.svg"
// import { useContext, useEffect } from "react";
// import { dummyData } from "../../context/AuthContext";
import useFetchAllUser from "../../api/user/useFetchAllUser";
import { useEffect, useState } from "react";
import Loading from "../../component/loading/Loading";
import { handleDeleteUser } from "./deleteUser/DeleteUser";
import useDelete from "../../api/user/useDelete";

const UserTable = () => {
  const navigate = useNavigate();
  // const {userData:data, setUserData:setData} = useContext(dummyData)
  const {data:dataList, loading, error, fetchAllUser} = useFetchAllUser();
  const {deleteUser} = useDelete();
  const [data, setData] = useState([]);

  useEffect(()=>{
    fetchAllUser();
  },[])

  useEffect(() => {
  if (Array.isArray(dataList)) {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setData(dataList);
  } else {
    setData([]); 
  }
  console.log(dataList)
}, [dataList]);


  function handleEdit(value){
    // console.log(value);
    navigate(`/dashboard/user/edit/${value.id}`);
  }

  if(loading){
    return(
      <>
        {/* <div className="w-full max-h-[67vh]">
          <p className="text-7xl">Loading...</p>
        </div> */}
        <Loading/>
      </>
    )
  }

  if(error){
    return(
      <>
        <div className="w-full max-h-[67vh]">
          <p className="text-7xl">Retry in a while</p>
        </div>
      </>
    )
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

          {data?.map((value, index) => {
            return (
              <tr
                key={value.id}
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
                    <Roles roles={value?.role?.roleName} />
                  </div>
                </td>
                <td className={clsx("p-2")}>{!value.lastLogin ? "--" : value.lastLogin} </td>
                <td className={clsx("p-2")}>
                  <div className="flex gap-3">

                  <button className="hover:cursor-pointer"
                  onClick={() => {handleEdit(value)}}>
                    {" "}
                    <img src={editIcon} />{" "}
                  </button>{" "}
                  {/* Delete button */}
                  <button className="hover:cursor-pointer" 
                  onClick={() => {
                    handleDeleteUser(value, deleteUser, setData); 
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
