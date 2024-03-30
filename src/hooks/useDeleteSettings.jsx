import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../components/AuthContext";
import { TimerContext } from "../components/TimerContext";

const useDeleteSettings = () => {
  const { alignment, setAlignment } = useContext(TimerContext);
  const { userDetails } = useContext(AuthContext);
  const deleteSelectedMode = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/pomodoro/${userDetails.id}/?settings_name=${alignment}`
      );
      console.log(
        "Mode deleted successfully",
        response.data.mode.settings_name
      );
      setAlignment(response.data.mode.settings_name);

      return response;
    } catch (error) {
      console.log("Error deleting mode:", error);
    }
  };
  return { deleteSelectedMode };
};

export default useDeleteSettings;
