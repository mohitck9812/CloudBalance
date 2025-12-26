import React, { useContext, useState } from "react";
import BrandImage from "../../assets/Cloudkeeper_New.svg";
import Input from "../../component/Login/Input";
import { handleChangeEmail, handleChangePassword } from "./ValidationFunction";
import clsx from "clsx";
import { authData } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import useLogin from "../../api/user/useLogin";
// import api from "../../api/axios";

const Login = () => {
  const {setUser} = useContext(authData);
  // const {userData} = useCon, useStattext(dummyData);
  const navigate = useNavigate();
  const {data:loginUserData, loading, loginUser: loginFunction} = useLogin();
  // console.log(loginUserData);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });


  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  //login button
  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.email || !formData.password) {
    if (!formData.email) setEmailError("This field is required");
    if (!formData.password) setPasswordError("This field is required");
    return;
  }

  try {
    const response = await loginFunction({
      email: formData.email,
      password: formData.password,
    });
    console.log(response)
    localStorage.setItem("jwt", response.jwt);
    localStorage.setItem("authUser", JSON.stringify(response.userResponse));
    setUser(response.userResponse);
    navigate("/dashboard");
  } catch (err) {
    setEmailError("Invalid credentials");
    setPasswordError("Invalid credentials");
  }
};


  if(loading){
    //to set loading ui here
    return <>
      <div className="flex items-center justify-center">
        Loading User
        </div>
    </>
  }

  return (
    <>
    <div className="flex flex-col justify-between items-center h-dvh w-dvw">
      <div className="flex flex-col gap-5 justify-center items-center h-full">
        <header>
          <img src={BrandImage} alt="brand logo" />
        </header>
        <main>
          <form className="flex flex-col gap-4 w-120" onSubmit={handleSubmit}>
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="Business Email"
              value={formData.email}
              onChange={(e)=>{handleChangeEmail(e,setEmailError, formData, setFormData)}}
              // onChange={(e)=>{setEmail(e.target.value)}}
              error={emailError}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              // value={password}
              onChange={(e) => {
                handleChangePassword(e, setPasswordError, formData, setFormData)
              }}
              // onChange={(e)=>{setPassword(e.target.value)}}
              error={passwordError}
            />

            <div className="flex justify-end flex-wrap">
              <a
                className="text-primary text-sm hover:underline"
                href="/forgotpassword"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className={clsx(
                "bg-primary text-white p-3 rounded border-0 transition-all duration-200 hover:shadow-[-6px_13px_15px_#0a3ca24a] hover:cursor-pointer",
                (emailError || passwordError) && "disable"
              )}
              >
              LOGIN
            </button>
          </form>
        </main>
      </div>

      <footer>
        <div className="w-dvw h-13 bg-[#f5f5f5] p-4.5 px-9 flex justify-between">
          <div className="text-[14px]">
            Have Questions ?
            <a href="mailto:abc@example.com" className="text-primary ">
              {" "}
              Talk to our team
            </a>
          </div>
          <div className="text-[12px] text-black/45 font-medium">
            CloudKeeper 2025 | All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
    </>
  );
};

export default Login;
