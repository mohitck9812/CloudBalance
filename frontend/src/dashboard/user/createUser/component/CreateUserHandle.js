// src/.../component/CreateUserHandle.js
import { role as roleEnum } from "../../../../util/Role";

export async function handleCreateUserSubmit(e, createUserFn, navigate, selectedAccounts) {
  e.preventDefault();

  const form = e.target;

  const selectedRole = form.role?.value ?? "No Access"; 

  const roleId = roleEnum[selectedRole] ?? "3";
  
  // console.log(selectedAccounts)
  let accountIds = selectedAccounts
  if(roleId !=2){
    accountIds = [];
  }
  
  const newUser = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    roleId: roleId,    
    loginTime: null,
    active: false,
    password: form.password.value,
    accountIds: accountIds,
  };
  // console.log(newUser);


  try {
    // console.log(newUser);
    await createUserFn(newUser);
    navigate("/dashboard/user");
  } catch (err) {
    // handle error (toast/log)
    console.error("Create user failed", err);
  }
}
