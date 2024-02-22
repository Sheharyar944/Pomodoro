import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const useLogout = () => {
  const { logout: contextLogout } = useContext(AuthContext);

  const logout = () => {
    contextLogout();
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("username");
    localStorage.removeItem("id");
    localStorage.removeItem("email");
  };

  return logout;
};

export default useLogout;
