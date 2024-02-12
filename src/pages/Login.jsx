import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { Box } from "@mui/material";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const { setLoggedUser, getDetails } = useContext(AuthContext);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/auth/login/",
        {
          username,
          password,
        }
      );

      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("id", response.data.user.id);

      console.log(response.data);
      setLoggedUser(response.data);
      getDetails(response.data.user.username, response.data.user.id);

      navigate("/");
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser();
  };

  return (
    <Box sx={{ paddingTop: "50px" }}>
      <form>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={handleUsernameChange}
          ></input>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          ></input>
        </label>
        <button type="submit" onClick={handleSubmit}>
          Submit
        </button>
      </form>
    </Box>
  );
};

export default Login;
