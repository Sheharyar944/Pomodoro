import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../components/AuthContext";
import { Box } from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const { setLoggedUser, getDetails } = useContext(AuthContext);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/auth/login/",
        {
          email,
          password,
        }
      );

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
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
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
