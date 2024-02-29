import "./App.css";
import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Root from "./components/Root";
import SettingsTabs from "./components/SettingsTabs";
import ErrorPage from "./components/ErrorPage";
import Stats from "./components/Stats";
import Feedback from "./components/Feedback";

const isAuthenticated = false;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,

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
      {
        path: "/settings/timer",
        element: <SettingsTabs />,
      },
      {
        path: "/settings/notification",
        element: <SettingsTabs />,
      },
      {
        path: "/settings/application",
        element: <SettingsTabs />,
      },
      {
        path: "/settings",
        element: <SettingsTabs />,
      },
      {
        path: "/feedback",
        element: <Feedback />,
      },
      {
        path: "/stats",
        element: <Stats />,
      },

      {
        path: "/private",
        element: isAuthenticated ? (
          <SettingsTabs />
        ) : (
          <Navigate to="/login" replace />
        ),
      },
    ],
  },
]);
function App() {
  return <RouterProvider router={router} />;
}

export default App;
