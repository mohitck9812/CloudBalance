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
import IsAuthenticated from "./IsAuthenticated";
import EditUser from "../dashboard/user/editUser/EditUser";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { element: <IsAuthenticated> <Login /></IsAuthenticated>, replace: true,index: true },
      // {element: <Login />, replace: true, index: true},
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
            children:[
              
            ]
          },
          { 
            path: "user/create", 
            element: <CreateUser /> 
          },
          {
            path: "user/edit/:userID",
            element:<EditUser />
          }
        ],
      },  
    ],
    
  },
  {
        path: "*",
        element: <NotFound />
      }
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
