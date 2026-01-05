import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login_signup/Login";
import Signup from "../pages/login_signup/Signup";
import Dashboard from "../pages/dashboard/Dashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

export default router;
