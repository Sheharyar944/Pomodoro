import React, { useContext, useState } from "react";
import Timer from "../components/Timer.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { AuthContext } from "../components/AuthContext.jsx";
import { Button } from "@mui/material";
import SettingTabs from "../components/SettingsTabs.jsx";
import axios from "axios";
import MyCarousel from "../components/MyCarousel.jsx";

const Home = () => {
  const { user, userDetails } = useContext(AuthContext);
  const [task, setTask] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log("token", user.access);
      console.log("user", user.user);

      const response = await fetch(`http://127.0.0.1:8000/createtasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer" + user.access,
        },
        body: JSON.stringify({ description: task }),
      });
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
        sx={{
          width: 500,
          maxWidth: "100%",
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
            style={{ borderColor: "black" }}
          />
          <Button type="submit">Click</Button>
        </form>
      </Box>
    </Box>
  );
};

export default Home;
