import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const useLogout = () => {
  const { logout: contextLogout } = useContext(AuthContext);

  const logout = () => {
    contextLogout();
  };

  return logout;
};

export default useLogout;
