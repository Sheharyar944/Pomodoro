import "./App.css";
import React, { useContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Root from "./components/Root";
import { AuthContext } from "./components/AuthContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login/",
        element: <Login />,
      },
      {
        path: "/profile/:userId",
        element: <Profile />,
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
