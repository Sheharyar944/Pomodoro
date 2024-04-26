import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";

const usePostTasks = () => {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("access_token");
  const postTask = async ({ task, category }, remaining) => {
    // event.preventDefault();
    if (task === "") {
      task = "no description";
    }
    if (category === "") {
      category = "no category";
    }

    try {
      console.log("token", user.access);
      console.log("user", user.user);

      const response = await fetch(`http://127.0.0.1:8000/createtasks/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          description: task,
          category: category,
          remaining_pomodoros: remaining,
        }),
      });
      const responseData = await response.json(); // Parse response as JSON

      console.log("Response status:", response.status);
      console.log("Response data:", responseData);

      if (response.ok) {
        console.log("task added successfully");
      } else {
        console.error("Task add failed");
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return { postTask };
};

export default usePostTasks;
