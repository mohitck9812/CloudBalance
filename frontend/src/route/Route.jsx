import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../dashboard/login/Login";
import Dashboard from "../dashboard/Dashboard";
import User from "../dashboard/user/User";
import CreateUser from "../dashboard/user/createUser/CreateUser";
import ProtectedRoute from "../component/Login/ProtectedRoute";
import NotFound from "../dashboard/NotFound"
import Home from "../dashboard/Home";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <Login />, replace: true },
      {
        path: "dashboard",
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
        children: [
          {
            element:<Home/>,
            index: true,
          },
          {
            path: "user",
            element: <User />,
          },
          { 
            path: "user/create", 
            element: <CreateUser /> 
          },
        ],
      },
      {
        path: "*",
        element: <NotFound />
      }
      
    ],
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
