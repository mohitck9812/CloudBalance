/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable no-unused-vars */
//have to update password thing not working and active status

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  handleChangeFirstName,
  handleChangeFormEmail,
  handleChangeLastName,
} from "../../login/ValidationFunction";
import Input, {
  AccountListToAdd,
  BooleanSwitch,
} from "../createUser/component/Input";
import useFetchUserByID from "../../../api/user/useFetchUserByID";
import useEditUser from "../../../api/user/useEditUser";
import { InputSelect } from "../createUser/component/Input";
import Loading from "../../../component/loading/Loading";
import { toast } from "react-toastify";
import { role as roleEnum } from "../../../util/Role";
import useGetAllAccount from "../../../api/onboarding/useGetAllAccount";
import { useSelector } from "react-redux";

const userDetailTemplate = {
  accounts: [],
  active: false,
  email: "",
  firstName: "",
  id: null,
  lastLogin: null,
  password: "",
  role: {
    id: null,
    roleName: "",
  },
};

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
  const {
    data: allAccounts,
    loading: accountLoading,
    error: accountError,
    getAllAccount,
  } = useGetAllAccount();

  const [userDetail, setUserDetail] = useState(userDetailTemplate);
  const [emptyNameError, setEmptyNameError] = useState({});
  const [accounts, setAccounts] = useState([]);
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const user = useSelector((state) => state.auth.user);

  //--------------------setting data from api--------------------//
  useEffect(() => {
    getUserById(userID);
    getAllAccount();
  }, [userID]);

  useEffect(() => {
    if (data === null) {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUserDetail(data);
    setActive(data.active);
    setSelectedAccounts(data.accounts.map((acc) => acc.id))
  }, [data]);

  useEffect(() => {
    if (allAccounts) {
      setAccounts(allAccounts);
    }
  }, [allAccounts]);

  //------------------------------Handlers---------------------------//
  const handleEditSubmit = (e, userDetail) => {
    e.preventDefault();

    if (
      !userDetail.firstName?.trim() ||
      !userDetail.lastName?.trim() ||
      !userDetail.email?.trim()
    ) {
      // alert("Please fill all required fields");
      return;
    }
    userDetail.accountIds = selectedAccounts
    const roleId = userDetail.role.id;
    if(roleId != 2){
      userDetail.accountIds = []
    }
    const payload = {
      ...userDetail,
      active,
      roleId,
      ...(password.trim() && { password }),
    };
    editUser(userID, payload);
    navigate("/dashboard/user");
  };

  const handleErrorInData = () => {
    navigate("/dashboard/home");
    toast.error("User Not Found");
  };

  const toggleAccount = (accountId) => {
    if (user?.role.roleName !== "ADMIN") return;

    setSelectedAccounts((prev) =>
      prev.includes(accountId)
        ? prev.filter((id) => id !== accountId)
        : [...prev, accountId]
    );
  };

  //----------------------------UI-------------------------//
  if (error) {
    return <>{handleErrorInData()}</>;
  }

  if (loading) {
    return (
      <>
        <div className="flex items-center justify-center h-screen">
          <Loading />
        </div>
      </>
    );
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
                  {/* first Name */}
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

                  {/* Last Name */}
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

                {/* Email */}
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

                  {/* Password */}
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

                  {/* Role Selection */}
                  <InputSelect
                    label="Select Roles"
                    name="role"
                    id="role"
                    values={["ADMIN", "CUSTOMER", "READ_ONLY"]}
                    value={userDetail.role?.roleName || ""}
                    onChange={(e) =>
                      setUserDetail((prev) => ({
                        ...prev,
                        role: {
                          ...prev.role,
                          id: roleEnum[e.target.value],
                          roleName: e.target.value,
                        },
                      }))
                    }
                  />

                  {/* Active Status */}
                  <BooleanSwitch
                    label="Account Status"
                    value={active}
                    onChange={setActive}
                  />
                </div>

                {userDetail.role.id === roleEnum.CUSTOMER && (
                  <AccountListToAdd
                    accounts={accounts}
                    selectedAccounts={selectedAccounts}
                    user={user}
                    loading={accountLoading}
                    toggleAccount={toggleAccount}
                  />
                )}

                {/* Submit button */}
                <button
                  className="self-start my-2 rounded text-white bg-primary p-2 transition-all duration-150 ease-in hover:cursor-pointer hover:bg-blue-600"
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
