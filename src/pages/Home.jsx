import React, { useContext, useState } from "react";
import Timer from "../components/Timer.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import { AuthContext } from "../components/AuthContext.jsx";
import { Button } from "@mui/material";
import SettingTabs from "../components/SettingTabs.jsx";

const Home = () => {
  const { user, userDetails } = useContext(AuthContext);
  const [task, setTask] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/${userDetails.id}/tasks/`,
        {
          method: "POST",
          header: {
            "Content-Type": "application/json",
            Authorization: "user.token",
          },
          body: JSON.stringify({ description: task, updated: new Date() }),
        }
      );
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
    <Box display="flex" flexDirection="column" alignItems="center">
      <Timer />
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
            value={task}
            onChange={(e) => setTask(e.target.value)}
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
