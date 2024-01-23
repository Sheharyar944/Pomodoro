import React, { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header.jsx";
import Divider from "@mui/material/Divider";
import { Box, Button } from "@mui/material";
import useIsLoggedIn from "../hooks/useIsLoggedIn.jsx";
import useLogout from "../hooks/useLogout.jsx";
import { AuthContext } from "./AuthContext.jsx";

const Root = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const isLoggedIn = useIsLoggedIn();
  const { userDetails } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box>
      <Box
        className="header"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box>
          <Header />
        </Box>
        <Box>
          {isLoggedIn && (
            <Button
              onClick={() => navigate(`/Profile/${userDetails.id}`)}
              style={{ color: "black" }}
            >
              {userDetails.username}
            </Button>
          )}
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant="text"
              style={{ color: "black" }}
            >
              Logout
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              variant="text"
              style={{ color: "black" }}
            >
              Login
            </Button>
          )}
        </Box>
      </Box>
      <Divider></Divider>
      <Outlet />
    </Box>
  );
};

export default Root;
