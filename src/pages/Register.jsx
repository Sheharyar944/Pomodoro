import React, { useState } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import axios from "axios";
import useLogin from "../hooks/useLogin";
import Typography from "@mui/material/Typography";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const { loginUser } = useLogin();
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/users/register/register/",
        { username, email, password }
      );

      if (response.status === 201) {
        console.log("user registered successfully");
        loginUser(email, password);
      }
    } catch (error) {
      setError(error);
      if (error.response.data.username) {
        setUsernameError(true);
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Error:", error.response.data.username[0]);
        // Display error message to the user
        // alert(error.response.data.detail);
      }
      if (error.response.data.email) {
        setEmailError(true);
        console.log("Error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.log("Error:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error:", error.message);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();
  };

  const handleNameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const isPasswordValid = (password) => {
    // Regular expression to check for at least 8 alphanumeric characters
    const passwordRegex = /^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <Box
      className="background"
      border={1}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={handleSubmit}>
        <Box
          width="350px"
          height="325px"
          backgroundColor="white"
          padding="40px"
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "left-align",
            alignItems: "left-align",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
          }}
        >
          <Box display="flex" marginBottom="20px">
            <EventAvailableIcon sx={{ marginRight: "5px" }} />
            <Typography variant="body1" color="initial">
              Pomodoro Tracker
            </Typography>
            <IconButton
              color="primary"
              sx={{ marginLeft: "auto" }}
              aria-label=""
              onClick={() => navigate("/login")}
            >
              <ArrowBackIcon />
            </IconButton>
          </Box>
          <Typography variant="h5" color="initial">
            Create account
          </Typography>
          <TextField
            required
            error={usernameError}
            id="standard-basic"
            label="username"
            variant="standard"
            value={username}
            onChange={handleNameChange}
            helperText={
              error && error.response && error.response.data
                ? error.response.data.username
                : ""
            }
          />
          <TextField
            required
            error={emailError}
            id="outlined-required"
            label="email"
            variant="standard"
            value={email}
            onChange={handleEmailChange}
            helperText={
              error && error.response && error.response.data
                ? error.response.data.email
                : ""
            }
          />
          <FormControl variant="standard">
            <InputLabel htmlFor="standard-adornment-password">
              Password
            </InputLabel>
            <Input
              required
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={handlePasswordChange}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              inputProps={{
                pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,}$",
              }}
            />
            {!isPasswordValid(password) && (
              <FormHelperText error={true}>
                Password must be at least 8 characters long and contain at least
                one letter and one number.
              </FormHelperText>
            )}
          </FormControl>
          <Button
            sx={{
              width: "100px",
              marginLeft: "250px",
              borderRadius: "0px",
              marginTop: "auto",
            }}
            type="submit"
            variant="contained"
          >
            Sign Up
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
