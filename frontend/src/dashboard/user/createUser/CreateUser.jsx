// src/.../CreateUser.jsx
import React, { useContext, useEffect, useState } from "react";
import Input, { AccountListToAdd, InputSelect } from "./component/Input";
import {
  handleChangeFormEmail,
  handleChangeFirstName,
  handleChangeLastName,
} from "../../login/ValidationFunction";
import { handleCreateUserSubmit } from "./component/CreateUserHandle";
import { useNavigate } from "react-router";
import useCreateUser from "../../../api/user/UseCreateUser";
import Loading from "../../../component/loading/Loading";
import useGetAllAccount from "../../../api/onboarding/useGetAllAccount";
import { authData } from "../../../context/AuthContext";

const CreateUser = () => {
  const navigate = useNavigate();
  const { loading, error, createUser } = useCreateUser();
  const {
    data,
    loading: accountLoading,
    error: accountError,
    getAllAccount,
  } = useGetAllAccount();
  const [userDetail, setUserDetail] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "READ_ONLY",
    active: false,
  });
  const [accounts, setAccounts] = useState();
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const { user } = useContext(authData);
  const [emptyNameError, setEmptyNameError] = useState({
    firstNameError: "",
    lastNameError: "",
    emailError: "",
    role: {
      id: null,
      name: ""
    },
  });

  //------------------fetching data-----------------//
  useEffect(() => {
    getAllAccount();
  }, []);

  useEffect(() => {
    console.log(data)
    if (data) {
      setAccounts(data);
    }
  }, [data]);

  //------------------------Handler-------------------//
  const toggleAccount = (accountId) => {
    if (user?.role.roleName !== "ADMIN") return;

    setSelectedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
    console.log(selectedAccounts);
  };

  //---------------------------UI-------------------//
  if (loading) return <Loading />;

  if (error) {
    return (
      <div className="bg-black/10 flex flex-col gap-5 h-[calc(100vh-132px)]">
        <div className="w-full p-5 border-b border-black/15">
          Retry In A While....
        </div>
      </div>
    );
  }

  return (
    <div className="bg-black/10 flex flex-col gap-5 h-[calc(100vh-132px)]">
      <div className="w-full p-5 border-b border-black/15">
        <h1 className="font-bold text-4xl">Add New User</h1>
      </div>

      <div className="px-5 py-3">
        <div className="rounded shadow-xl bg-white p-2">
          <form
            className="p-3"
            onSubmit={(e) => handleCreateUserSubmit(e, createUser, navigate, selectedAccounts)}
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
                  id="email"
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
                  values={["ADMIN", "CUSTOMER", "READ_ONLY"]}
                  value={userDetail.role}
                  onChange={(e) =>
                    setUserDetail((p) => ({ ...p, role:e.target.value }))
                  }
                />
              </div>

              <div className="flex gap-10">
                <Input
                  label="Password *"
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Password"
                  value={userDetail.password}
                  onChange={(e) => {
                    const prev = { ...userDetail, password: e.target.value };
                    setUserDetail(prev);
                  }}
                />
              </div>

              {userDetail?.role === "CUSTOMER" && <AccountListToAdd accounts={accounts} selectedAccounts={selectedAccounts} user={user} toggleAccount={toggleAccount} loading={accountLoading}/>}

              <div className="flex gap-10"></div>

              <button
                className="self-start my-2 rounded bg-primary p-2 transition-all duration-150 ease-in hover:cursor-pointer hover:bg-blue-600"
                type="submit"
              >
                Add User
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;