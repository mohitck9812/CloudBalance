export function formSubmission(formData, userData, setUser) {
  console.log(
    "form submitted with data email: " +
      formData.email +
      " and password is: " +
      formData.password
  );

  const user = checkValidUser(formData.email, userData);
  // console.log(user[0])


  if (user[0]?.firstName) {
    console.log("Inside set user condition")
    setUser(...user);
    localStorage.setItem("authUser", JSON.stringify(user[0]));
    return true;
  }

  // alert("Email id does not match");
  return false;
  // console.log(...user)
}

const checkValidUser = (loginEmail, userData) => {
  return userData.filter((value) => value.email === loginEmail);
};

export function handleChangeEmail(e, setEmailError, formData, setFormData) {
  const { name, value } = e.target;

  const updatedData = { ...formData, [name]: value };
  setFormData(updatedData);

  if (!value.trim()) {
    setEmailError("This field is required");
    return;
  }

  setEmailError(!updatedData.email ? "This field is required" : null);
}

export function handleChangeFormEmail(e, setEmailError, formData, setFormData) {
  const { name, value } = e.target;

  const updatedData = { ...formData, [name]: value };
  setFormData(updatedData);

  if (!value.trim()) {
    // setEmailError("This field is required");
    setEmailError((prev) => ({
      ...prev,
      emailError: "This field is required",
    }));

    return;
  }

  setEmailError((prev) => ({
    ...prev,
    emailError: "",
  }));
}

export function handleChangePassword(
  e,
  setPasswordError,
  formData,
  setFormData
) {
  const data = { ...formData, [e.target.name]: e.target.value };
  setFormData({
    ...data,
  });
  setPasswordError(!data.password ? "This field is required" : null);
}

export function handleChangeFirstName(e, setUserName, username, setNameError) {
  const { name, value } = e.target;

  setUserName({
    ...username,
    [name]: value,
  });

  if (value.trim() === "") {
    setNameError((prev) => ({
      ...prev,
      firstNameError: "First name cannot be empty",
    }));
  } else {
    setNameError((prev) => ({
      ...prev,
      firstNameError: "",
    }));
  }
}

export function handleChangeLastName(e, setUserName, username, setNameError) {
  const { name, value } = e.target;
  setUserName({
    ...username,
    [name]: value,
  });

  if (value.trim() === "") {
    setNameError((prev) => ({
      ...prev,
      lastNameError: "Last name cannot be empty",
    }));
  } else {
    setNameError((prev) => ({
      ...prev,
      lastNameError: "",
    }));
  }
}
