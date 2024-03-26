import React, { useState, useContext, useEffect } from "react";
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
import useGetSettings from "../hooks/useGetSettings";
import { TimerContext } from "../components/TimerContext";

const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [email, setEmail] = useState("ucomsats@gmail.com");
  const [password, setPassword] = useState("abcd1437");
  const { loginUser } = useLogin();
  const { getModes } = useGetSettings();
  const {
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    isPomodoro,
    isLongBreak,
    isBreak,
  } = useContext(TimerContext);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const res = await getModes(response.data.user.id);
      const selectedMode = res.data.find((mode) => mode.is_selected);
      if (selectedMode.is_pomodoro && !selectedMode.is_disabled) {
        setPomodoroTime(selectedMode.current_time);
      } else {
        setPomodoroTime(selectedMode.pomodoro_duration);
      }
      if (selectedMode.is_long_break) {
        setLongBreakTime(selectedMode.current_time);
      } else {
        setLongBreakTime(selectedMode.long_break_duration);
      }
      if (selectedMode.is_break) {
        setShortBreakTime(selectedMode.current_time);
      } else {
        setShortBreakTime(selectedMode.short_break_duration);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            <Box sx={{ display: "flex", marginTop: "auto" }}>
              <Button
                onClick={() => navigate("/")}
                sx={{
                  marginTop: "auto",
                  width: "100px",
                  marginLeft: "auto",
                  borderRadius: "0px",
                }}
                variant="contained"
              >
                Back
              </Button>

              <Button
                sx={{
                  marginTop: "auto",
                  width: "100px",
                  marginLeft: "10px",
                  borderRadius: "0px",
                }}
                type="submit"
                variant="contained"
              >
                Log in
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
