import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login_signup/Login";
import Signup from "../pages/login_signup/Signup";
import AppLayout from "../layout/AppLayout";
import Home from "../pages/home/Home";
import NotesDashboard from "../pages/notes/NotesDashboard";
import ShoppingDashboard from "../pages/shopping/ShoppingDashboard";
import NoteDetails from "../pages/notes/NoteDetails";
import NoteForm from "../pages/notes/NoteForm";

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
    path: "/app",
    element: <AppLayout />,
    children: [
      { index: true, element: <Home /> },
      {
        path: "notes",
        element: <NotesDashboard />,
        children: [
          { index: true, element: null }, // list stays visible

          { path: "new", element: <NoteForm /> },
          { path: "edit", element: <NoteForm /> },
          { path: ":id", element: <NoteDetails /> },
        ],
      },
      { path: "shopping", element: <ShoppingDashboard /> },
    ],
  },
]);

export default router;
