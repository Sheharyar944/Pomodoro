import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList.jsx";
import useGetTasks from "../hooks/useGetTasks.jsx";
import { Box } from "@mui/material";

const Profile = () => {
  const { tasks, error, loading } = useGetTasks();

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error ${error.message}`;
  }
  console.log(tasks);

  return (
    <Box>
      Tasks
      {Array.isArray(tasks) &&
        tasks.map((task, index) => <TaskList key={index} task={task} />)}
    </Box>
  );
};

export default Profile;
