// src/.../component/CreateUserHandle.js
import { role as roleEnum } from "../../../../util/Role";

export async function handleCreateUserSubmit(e, createUserFn, navigate) {
  e.preventDefault();

  const form = e.target;

  const selectedRole = form.role?.value ?? "No Access"; 

  const roleId = roleEnum[selectedRole] ?? null;

  const newUser = {
    firstName: form.firstName.value,
    lastName: form.lastName.value,
    email: form.email.value,
    role: roleId,    
    loginTime: null,
    isActive: false,
  };

  try {
    await createUserFn(newUser);

    navigate("/dashboard/user");
  } catch (err) {
    // handle error (toast/log)
    console.error("Create user failed", err);
  }
}
