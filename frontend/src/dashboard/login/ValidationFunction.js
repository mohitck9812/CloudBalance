export function formSubmission(formData, userData, setUser) {
  console.log(
    "form submitted with data email: " +
      formData.email +
      " and password is: " +
      formData.password
  );

  const user = checkValidUser(formData.email, userData);

  if (user[0]?.firstName) {
    setUser(...user);
    localStorage.setItem("authUser", JSON.stringify(user[0]));
    return true;
  }

  return false;
}

//check valid user
const checkValidUser = (loginEmail, userData) => {
  return userData.filter((value) => value.email === loginEmail);
};

// Email change 
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


// Form Email change ( used in login page )
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


// trigger when password changes (used in login form)
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


// first name change (used in edit and create user)
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


// last name change ( used in edit and create user)
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
