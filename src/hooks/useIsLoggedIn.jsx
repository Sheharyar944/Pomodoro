import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const useIsLoggedIn = () => {
  const { user } = useContext(AuthContext);
  return user ? true : false;
};

export default useIsLoggedIn;
