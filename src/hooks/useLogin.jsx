import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";

const useLogin = () => {
  let navigate = useNavigate();
  const { setLoggedUser, getDetails } = useContext(AuthContext);

  const loginUser = async (email, password) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/auth/login/",
        {
          email,
          password,
        }
      );
      //   console.log("trying to login:", response);

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("id", response.data.user.id);
      localStorage.setItem("email", response.data.user.email);

      console.log(response.data);
      setLoggedUser(response.data);
      getDetails(
        response.data.user.username,
        response.data.user.id,
        response.data.user.email
      );
      return response;
    } catch (error) {
      console.log("Error", error);
    }
  };

  return { loginUser };
};

export default useLogin;
