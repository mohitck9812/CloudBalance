import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Login from "../dashboard/login/Login";
import Dashboard from "../dashboard/Dashboard";
import User from "../dashboard/user/User";
import CreateUser from "../dashboard/user/createUser/CreateUser";
import ProtectedRoute from "../component/Login/ProtectedRoute";
import NotFound from "../dashboard/NotFound";
import Home from "../dashboard/Home";
import IsAuthenticated from "./IsAuthenticated";
import EditUser from "../dashboard/user/editUser/EditUser";
import Onboarding from "../dashboard/onboarding/Onboarding";
import CostExplorer from "../dashboard/costExplorer/CostExplorer";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: (
          // <IsAuthenticated>
            <Login />
          // </IsAuthenticated>
        ),
        replace: true,
        index: true,
      },
      // {element: <Login />, replace: true, index: true},
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            element: <Home />,
            index: true,
          },
          {
            path: "user",
            element: <ProtectedRoute allowedRole={[1,3]}><User /></ProtectedRoute>,
          },
          {
            path: "user/create",
            element: <ProtectedRoute allowedRole={[1,3]}><CreateUser /></ProtectedRoute>,
          },
          {
            path: "user/edit/:userID",
            element: <ProtectedRoute allowedRole={[1,3]}><EditUser /></ProtectedRoute>,
          },
          {
            path: "onboarding",
            element: <ProtectedRoute allowedRole={[1,3]}><Onboarding /></ProtectedRoute>,
          },
          {
            path: "cost-explorer",
            element: <CostExplorer />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function Route() {
  return <RouterProvider router={router} />;
}
