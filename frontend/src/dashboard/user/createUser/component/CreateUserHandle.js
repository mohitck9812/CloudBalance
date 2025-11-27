export function handleCreateUserSubmit(e, userData, setUserData, navigate) {
  e.preventDefault();

  const form = e.target;

  const newUser = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    role: [form.role.value],
    loginTime: null,
    isActive: true
  };
  
  console.log(newUser)
  setUserData([...userData, newUser]);

  navigate("/dashboard/user");
}
