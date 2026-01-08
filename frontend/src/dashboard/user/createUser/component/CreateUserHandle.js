// src/.../component/CreateUserHandle.js
import { role as roleEnum } from "../../../../util/Role";

export async function handleCreateUserSubmit(e, createUserFn, navigate) {
  e.preventDefault();

  const form = e.target;

  const selectedRole = form.role?.value ?? "No Access"; 

  const roleId = roleEnum[selectedRole] ?? "3";
  

  const newUser = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    roleId: roleId,    
    loginTime: null,
    active: false,
    password: form.password.value
  };
  // console.log(newUser);

  try {
    console.log(newUser);
    await createUserFn(newUser);
    navigate("/dashboard/user");
  } catch (err) {
    // handle error (toast/log)
    console.error("Create user failed", err);
  }
}
