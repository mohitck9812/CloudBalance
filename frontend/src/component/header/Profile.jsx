import React from "react";
import usersIcon from "../../assets/users.svg";
import info from "../../assets/info.svg";
import logoutIcon from "../../assets/logoutIcon.svg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/auth/auth.actions";

const Profile = () => {
  // const { user, setUser } = useContext(authData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const handleLogOut = () => {
    //to add logout api
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <div className="flex h-full justify-center items-center gap-2">
      {/* {console.log(user)} */}
      {/* profile */}
      <div className="flex ">
        <div className="w-10">
          <img
            src={usersIcon}
            alt="user"
            className="border rounded-3xl p-1 border-primary "
          />
        </div>
      </div>

      <div className="pr-2 border-r-2 border-black/10 ">
        <p className="text-xs text-black/60"> Welcome,</p>
        <p className="font-extrabold text-primary flex gap-1">
          {user.firstName + " " + user.lastName} <img src={info} alt="i" />
        </p>
      </div>

      <div className="border border-primary rounded p-2 transition ease-in hover:shadow-primary hover:shadow-lg hover:cursor-pointer">
        <button onClick={handleLogOut} className="flex text-primary gap-2 ">
          <img src={logoutIcon} alt="" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
