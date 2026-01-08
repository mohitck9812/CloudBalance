/* eslint-disable no-unused-vars */
//have to update password thing not working and active status

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  handleChangeFirstName,
  handleChangeFormEmail,
  handleChangeLastName,
} from "../../login/ValidationFunction";
import Input, { BooleanSwitch } from "../createUser/component/Input";
import useFetchUserByID from "../../../api/user/useFetchUserByID";
import useEditUser from "../../../api/user/useEditUser";
import {InputSelect} from "../createUser/component/Input"

const EditUser = () => {
  const { data, error, loading, getUserById } = useFetchUserByID();
  const {
    loading: submitLoading,
    error: submitError,
    editUser,
  } = useEditUser();
  const navigate = useNavigate();
  const { userID } = useParams();
  const [active, setActive] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUserById(userID);
  }, [userID]);

  const [userDetail, setUserDetail] = useState({});
  const [emptyNameError, setEmptyNameError] = useState({});

  useEffect(() => {
    if (data === null) {
      return;
    }
    // console.log(data)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserDetail(data);
    setActive(data.active);
    console.log(data);
  }, [data]);

  const handleEditSubmit = (e, userDetail) => {
    e.preventDefault();

    if (
      !userDetail.firstName?.trim() ||
      !userDetail.lastName?.trim() ||
      !userDetail.email?.trim()
    ) {
      alert("Please fill all required fields");
      return;
    }
    if (password.trim != "") userDetail.password = password;

    userDetail.active = active;
    // console.log(userDetail);
    editUser(userID, userDetail);
    alert("data modified successfuly ");
    navigate("/dashboard/user");
  };

  if (error) {
    return <>User Not Found</>;
  }

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
              onSubmit={(e) => handleEditSubmit(e, userDetail, data)}
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

                  <Input
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter New Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>

                <div className="flex gap-10">
                  {/* to add radio button of active  */}

                  <InputSelect
                    label={"Select Roles"}
                    name={"role"}
                    id={"role"}
                    values={["Admin", "Customer", "Read_Only"]}
                    value={userDetail.role?.roleName}
                    onChange={(e) =>
                      setUserDetail((p) => ({ ...p, role: e.target.value }))
                    }
                  />

                  <BooleanSwitch
                    label="Account Status"
                    value={active}
                    onChange={setActive}
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
