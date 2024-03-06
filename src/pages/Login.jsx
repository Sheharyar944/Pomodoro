import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import useLogin from "../hooks/useLogin";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useLogin();
  let navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // const loginUser = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://127.0.0.1:8000/users/auth/login/",
  //       {
  //         email,
  //         password,
  //       }
  //     );

  //     localStorage.setItem("access_token", response.data.access);
  //     localStorage.setItem("refresh_token", response.data.refresh);
  //     localStorage.setItem("username", response.data.user.username);
  //     localStorage.setItem("id", response.data.user.id);
  //     localStorage.setItem("email", response.data.user.email);

  //     console.log(response.data);
  //     setLoggedUser(response.data);
  //     getDetails(
  //       response.data.user.username,
  //       response.data.user.id,
  //       response.data.user.email
  //     );

  //     navigate("/");
  //   } catch (error) {
  //     console.log("Error", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await loginUser(email, password);
  };

  return (
    <Box sx={{ paddingTop: "50px" }}>
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
            border={0}
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
                onClick={() => navigate("/")}
              >
                <ArrowBackIcon />
              </IconButton>
            </Box>
            <Typography variant="h5" color="initial">
              Sign in
            </Typography>
            <TextField
              required
              // error={usernameError}
              id="standard-basic"
              label="Email Address"
              variant="standard"
              value={email}
              onChange={handleEmailChange}
              // helperText={
              //   error && error.response && error.response.data
              //     ? error.response.data.username
              //     : ""
              // }
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
            </FormControl>
            <Typography
              style={{ marginTop: "20px", fontSize: "14px" }}
              variant="body1"
              color="initial"
            >
              No account?
              <Button
                sx={{
                  textTransform: "none",
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                }}
                type="text"
                onClick={() => navigate("/signup")}
              >
                {`Create one!`}
              </Button>
            </Typography>

            <Button
              sx={{
                marginTop: "auto",
                width: "100px",
                marginLeft: "250px",
                borderRadius: "0px",
              }}
              type="submit"
              variant="contained"
            >
              Log in
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
