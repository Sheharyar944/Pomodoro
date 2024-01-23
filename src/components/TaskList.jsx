import React from "react";

const TaskList = ({ task }) => {
  return (
    <div>
      <p>{task.description}</p>
    </div>
  );
};

export default TaskList;
