import React, { useEffect, useState } from "react";
import TaskList from "../components/TaskList.jsx";
import useGetTasks from "../hooks/useGetTasks.jsx";
import { Box } from "@mui/material";

// const Profile = () => {

//   let [tasks, setTasks]  = useState([])

//   useEffect(() =>{
//     getTasks()
//   },[])

//   let getTasks = async () => {
//     try {
//       let response = await fetch('http://127.0.0.1:8000/tasks/');
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }
//       let data = await response.json();
//       setTasks(data);
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//     }
//   }

//   return (
//     <div>
//         {Array.isArray(tasks) && tasks.map((task, index) => (
//       <TaskList key={index} task={task} />
//     ))}
//     </div>
//   )
// }

// export default Profile

const Profile = () => {
  const { tasks, error, loading } = useGetTasks();

  if (loading) {
    return "Loading...";
  }

  if (error) {
    return `Error ${error.message}`;
  }

  return (
    <Box>
      Tasks
      {Array.isArray(tasks) &&
        tasks.map((task, index) => <TaskList key={index} task={task} />)}
    </Box>
  );
};

export default Profile;
