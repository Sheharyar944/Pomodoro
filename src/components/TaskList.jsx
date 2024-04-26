import { Box, Button, Divider, IconButton, Typography } from "@mui/material";
import React, { useContext, useEffect, useState, useRef } from "react";
import axios from "axios";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import DeleteIcon from "@mui/icons-material/Delete";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { AuthContext } from "./AuthContext";
import useGetTasks from "../hooks/useGetTasks";
import DoneIcon from "@mui/icons-material/Done";
import { TimerContext } from "./TimerContext";
import RepeatIcon from "@mui/icons-material/Repeat";
import StarIcon from "@mui/icons-material/Star";
import usePostTasks from "../hooks/usePostTasks";
import ToolTip from "./ToolTip";

const TaskList = ({ task, refresh, setRefresh, index }) => {
  const { userDetails } = useContext(AuthContext);
  const { pomodoroDone, dailyGoal } = useContext(TimerContext);
  const { getTasks } = useGetTasks();
  const { postTask } = usePostTasks();
  const token = localStorage.getItem("access_token");
  const [anchorEl, setAnchorEl] = useState(null);
  const [sure, setSure] = useState(false);
  const buttonRef = useRef(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setSure(false);
  };

  const handleClickOutside = (event) => {
    if (buttonRef.current && !buttonRef.current.contains(event.target)) {
      setSure(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://127.0.0.1:8000/user/${userDetails.id}/task/${task.id}`,
        { headers: { Authorization: "Bearer " + token } }
      );
      console.log("response deleting task", response);
    } catch (error) {
      console.log("error deleting task", error);
    }
  };

  const updateTask = async ({ assigned, remaining }) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/user/${userDetails.id}/task/${task.id}`,
        {
          assigned_pomodoros: assigned,
          remaining_pomodoros: remaining,
        },
        {
          headers: { Authorization: "Bearer " + token },
        }
      );
      console.log("response updating task", response);
    } catch (error) {
      console.log("error updating task", error);
    }
  };

  const handleAdd = async (event) => {
    event.preventDefault();
    // setAnchorEl(null);
    const details = {
      assigned: task.assigned_pomodoros + 1,
      remaining: task.remaining_pomodoros + 1,
    };
    await updateTask(details);
    setRefresh(!refresh);
  };

  const handleRepeat = async (event) => {
    event.preventDefault();
    // setAnchorEl(null);
    const details = {
      task: task.description,
      category: task.category,
    };
    await postTask(details);
    setRefresh(!refresh);
  };

  const handleRemove = async (event) => {
    event.preventDefault();
    // setAnchorEl(null);
    const addPomodoro = {
      assigned: task.assigned_pomodoros - 1,
      remaining: task.remaining_pomodoros - 1,
    };
    await updateTask(addPomodoro);
    setRefresh(!refresh);
  };

  const handleDone = async (event) => {
    event.preventDefault();
    let assigned = task.assigned_pomodoros;
    if (task.assigned_pomodoros > 1) {
      assigned = assigned - 1;
      const details = {
        task: task.description,
        category: task.category,
      };
      await postTask(details, 0);
    }
    const addPomodoro = {
      assigned: assigned,
      remaining: task.remaining_pomodoros - 1,
    };
    await updateTask(addPomodoro);
    setRefresh(!refresh);
  };

  // useEffect(() => {
  //   console.log("me is firing");
  //   const addPomodoro = {
  //     assigned: task.assigned_pomodoros,
  //     remaining: task.remaining_pomodoros - 1,
  //   };
  //   updateTask(addPomodoro);
  // }, [pomodoroDone]);

  const handleDelete = async (event) => {
    event.preventDefault();
    // setAnchorEl(null);
    await deleteTask();
    setRefresh(!refresh);
  };

  const handleSure = async (event) => {
    setSure(true);
  };

  return (
    <Box>
      {/* {task && task.remaining_pomodoros === 0 && index < dailyGoal ? (
        <Divider style={{ width: "850px" }}>
          {" "}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              color: "text.secondary",
              "& svg": {
                m: 1,
              },
            }}
          >
            <StarIcon fontSize="SMALL" />
            <Typography variant="body1" color="initial" fontSize={10}>
              Daily Goal
            </Typography>
          </Box>
        </Divider>
      ) : (
        <Divider style={{ width: "850px" }} />
      )} */}
      {index !== 0 && <Divider style={{ width: "850px" }} />}

      <Box
        // border={1}
        sx={{ width: "850px", display: "flex", margin: "10px 0 10px 0" }}
      >
        <Box sx={{ width: "170px" }}>
          {task.category === "no category" ? (
            <Typography
              sx={{ fontStyle: "italic", opacity: 0.6 }}
              variant="body1"
              color="initial"
            >
              {task.category}
            </Typography>
          ) : (
            <Typography variant="body1" color="initial">
              {task.category}
            </Typography>
          )}
        </Box>

        <Box
          //  border={1}

          sx={{
            display: "flex",
            width: "600px",
            alignItems: "center",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {task.description === "no description" ? (
            <Typography sx={{ fontStyle: "italic", opacity: 0.6 }}>
              {task.description}
            </Typography>
          ) : (
            <Typography>{task.description}</Typography>
          )}

          <Box sx={{ display: "flex" }}>
            {task.remaining_pomodoros === 0 ? (
              <ToolTip title={"Repeat"} placement={"right-start"}>
                <IconButton
                  onClick={handleRepeat}
                  type="text"
                  sx={{
                    display: "flex",
                    borderRadius: "5px",
                    width: "30px",
                    height: "30px",
                    borderColor: "lightgrey",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                  }}
                >
                  <RepeatIcon />
                </IconButton>
              </ToolTip>
            ) : (
              <ToolTip title={"Add more pomodoros"} placement={"right-start"}>
                <IconButton
                  onClick={handleAdd}
                  type="text"
                  sx={{
                    display: "flex",
                    width: "30px",
                    height: "30px",
                    borderColor: "lightgrey",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid",
                  }}
                >
                  {task.remaining_pomodoros}
                </IconButton>
              </ToolTip>
            )}

            <div>
              {task.remaining_pomodoros < 1 ? (
                sure ? (
                  <ToolTip title={"Are you sure?"} placement={"right-start"}>
                    <IconButton
                      ref={buttonRef}
                      onClick={handleDelete}
                      sx={{
                        display: "flex",
                        borderRadius: "5px",
                        width: "30px",
                        height: "30px",
                        borderColor: "lightgrey",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid",
                        marginLeft: "5px",
                        color: "red",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ToolTip>
                ) : (
                  <ToolTip title={"Delete"} placement={"right-start"}>
                    <IconButton
                      onClick={handleSure}
                      sx={{
                        display: "flex",
                        borderRadius: "5px",
                        width: "30px",
                        height: "30px",
                        borderColor: "lightgrey",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid",
                        marginLeft: "5px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </ToolTip>
                )
              ) : (
                <ToolTip title={"Click to open menu"} placement={"right-start"}>
                  <IconButton
                    aria-controls={open ? "basic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}
                    sx={{
                      display: "flex",
                      borderRadius: "5px",
                      width: "30px",
                      height: "30px",
                      borderColor: "lightgrey",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "1px solid",
                      marginLeft: "5px",
                    }}
                  >
                    <MoreHorizIcon />
                  </IconButton>
                </ToolTip>
              )}

              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                sx={{ width: "1000px", maxWidth: "100%" }}
              >
                <MenuItem onClick={handleAdd}>
                  <ListItemIcon>
                    <AddIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Add more</ListItemText>
                </MenuItem>
                {task.remaining_pomodoros <= 1 ? (
                  <MenuItem onClick={handleRemove} disabled>
                    <ListItemIcon>
                      <RemoveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove one</ListItemText>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleRemove}>
                    <ListItemIcon>
                      <RemoveIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Remove one</ListItemText>
                  </MenuItem>
                )}
                <MenuItem onClick={handleDone}>
                  <ListItemIcon>
                    <DoneIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText>Mark as done</ListItemText>
                </MenuItem>

                <Divider />
                {sure ? (
                  <MenuItem
                    onClick={handleDelete}
                    style={{ backgroundColor: "red" }}
                  >
                    <ListItemIcon>
                      <DeleteIcon style={{ color: "white" }} fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{ style: { color: "white" } }}
                    >
                      Delete?
                    </ListItemText>
                  </MenuItem>
                ) : (
                  <MenuItem onClick={handleSure}>
                    <ListItemIcon>
                      <DeleteIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText>Delete</ListItemText>
                  </MenuItem>
                )}
              </Menu>
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default TaskList;
