import React, { useContext, useState, useEffect } from "react";
import Timer from "../components/Timer.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../components/AuthContext.jsx";
import { Button } from "@mui/material";
import MyCarousel from "../components/MyCarousel.jsx";
import useGetSettings from "../hooks/useGetSettings.jsx";
import { TimerContext } from "../components/TimerContext.jsx";

const Home = () => {
  const { user, userDetails } = useContext(AuthContext);
  const { isPomodoro, alignment } = useContext(TimerContext);
  const [task, setTask] = useState("");
  const token = localStorage.getItem("access_token");
  const { saveSettings, getSettings, getModes, loading } = useGetSettings();

  useEffect(() => {
    if (user && !loading) {
      saveSettings(alignment);
    }
  }, [isPomodoro]);

  // useEffect(() => {
  //   if (user) {
  //     getSettings();
  //   }
  // }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("token", user.access);
      console.log("user", user.user);

      const response = await fetch(`http://127.0.0.1:8000/createtasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ description: task }),
      });
      const responseData = await response.json(); // Parse response as JSON

      console.log("Response status:", response.status);
      console.log("Response data:", responseData);

      if (response.ok) {
        console.log("task added successfully");
        setTask("");
      } else {
        console.error("Task add failed");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <Box
      sx={{
        overflow: "auto",
        padding: "20px",
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Timer />
      <MyCarousel />
      {/* <SettingTabs /> */}

      <Box
        // border={1}
        sx={{
          width: 500,
          maxWidth: "100%",
          height: "300px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label=""
            id="fullWidth"
            onChange={(e) => setTask(e.target.value)}
            value={task}
            type="text"
            placeholder="Write your task..."
            style={{ borderColor: "black", width: "500px" }}
          />
          <Button type="submit">Click</Button>
        </form>
      </Box>
      <Button
        onClick={() => {
          getModes();
        }}
      >
        {" "}
        get modes
      </Button>
    </Box>
  );
};

export default Home;
