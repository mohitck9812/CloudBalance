import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { dummyData } from "../../../context/AuthContext";
import {
  handleChangeFirstName,
  handleChangeFormEmail,
  handleChangeLastName,
} from "../../login/ValidationFunction";
import Input, { InputSelect } from "../createUser/component/Input";

const EditUser = () => {
  const { userData: data, setUserData: setData } = useContext(dummyData);
    const navigate = useNavigate();
  const { userID } = useParams();

  const [userDetail, setUserDetail] = useState({});
  const [emptyNameError, setEmptyNameError] = useState({});

  useEffect(() => {
  const foundUser = data.find((value) => value.id == userID);
  setUserDetail(foundUser || {});  
}, [userID, data]);


  const handleEditSubmit = (e, userDetail, data, setData) => {
    e.preventDefault();

  if (
    !userDetail.firstName?.trim() ||
    !userDetail.lastName?.trim() ||
    !userDetail.email?.trim()
  ) {
    alert("Please fill all required fields");
    return;
  }

  const updatedUsers = data.map((user) =>
    user.id == userDetail.id ? { ...userDetail } : user
  );

  setData(updatedUsers);

//   alert("User updated successfully!");

  navigate("/dashboard/user");
};


  return (
    <div>
      <div className="bg-black/10 flex flex-col gap-5 h-[calc(100vh-132px)]">
        <div className="w-full p-5 border-b border-black/15">
          <h1 className="font-bold text-4xl">Edit User</h1>
        </div>

        <div className="px-5 py-3">
          <div className="rounded shadow-xl bg-white p-2">
            <form
              className="p-3"
              onSubmit={(e) =>
                handleEditSubmit(e, userDetail,data, setData)
                // console.log("edit function" + e)
              }
            >
              <div className="flex flex-col gap-5">
                <div className="flex gap-10">
                  <Input
                    label="First Name *"
                    type="text"
                    name="firstName"
                    placeholder="Enter First Name"
                    value={userDetail.firstName}
                    onChange={(e) =>
                      handleChangeFirstName(
                        e,
                        setUserDetail,
                        userDetail,
                        setEmptyNameError
                      )
                    }
                    error={emptyNameError.firstNameError}
                  />
                  <Input
                    label="Last Name *"
                    type="text"
                    name="lastName"
                    placeholder="Enter Last Name"
                    value={userDetail.lastName}
                    onChange={(e) =>
                      handleChangeLastName(
                        e,
                        setUserDetail,
                        userDetail,
                        setEmptyNameError
                      )
                    }
                    error={emptyNameError.lastNameError}
                  />
                </div>
                <div className="flex gap-10">
                  <Input
                    label="Email *"
                    type="email"
                    name="email"
                    placeholder="Enter Email ID"
                    value={userDetail.email}
                    onChange={(e) =>
                      handleChangeFormEmail(
                        e,
                        setEmptyNameError,
                        userDetail,
                        setUserDetail
                      )
                    }
                    error={emptyNameError.email}
                  />

                  <InputSelect
                    label={"Select Roles"}
                    name={"role"}
                    id={"role"}
                    values={["No Access", "Read", "Admin"]}
                  />
                </div>
                <button
                className="self-start my-2 rounded bg-primary p-2 transition-all duration-150 ease-in hover:cursor-pointer hover:bg-blue-600"
                type="submit"
              >
                Update User
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditUser;
