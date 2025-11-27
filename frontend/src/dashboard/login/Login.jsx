import React, { useContext, useState } from "react";
import BrandImage from "../../assets/Cloudkeeper_New.svg";
import Input from "../../component/Login/Input";
import { formSubmission, handleChangeEmail, handleChangePassword } from "./ValidationFunction";
import clsx from "clsx";
import { authData, dummyData } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const Login = () => {
  const {setUser} = useContext(authData);
  const {userData} = useContext(dummyData);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); 
    
    if (!formData.email || !formData.password) return;

    if(formSubmission(formData,userData, setUser)) {
      // console.log("move to dashboard");
      navigate("/dashboard");
    }
  };

  return (
    <>
    <div className="flex flex-col justify-between items-center h-dvh w-dvw">
      
      {/* {console.log("You are on login page")} */}
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
              error={emailError}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => {
                handleChangePassword(e, setPasswordError, formData, setFormData)
              }}
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
