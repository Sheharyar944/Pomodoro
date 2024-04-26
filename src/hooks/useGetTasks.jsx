import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/AuthContext";

const useGetTasks = () => {
  const [tasks, setTasks] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { userDetails, user } = useContext(AuthContext);

  const getTasks = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://127.0.0.1:8000/user/${userDetails.id}/tasks/`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      setError(error.message);
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("I am working");
    if (user) {
      getTasks();
    }
  }, []);

  return { tasks, error, loading, getTasks };
};

export default useGetTasks;
