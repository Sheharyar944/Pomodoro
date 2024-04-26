import React, { useContext, useState, useEffect } from "react";
import Timer from "../components/Timer.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { AuthContext } from "../components/AuthContext.jsx";
import { Button, Icon, IconButton, Typography } from "@mui/material";
import MyCarousel from "../components/MyCarousel.jsx";
import useGetSettings from "../hooks/useGetSettings.jsx";
import usePostTasks from "../hooks/usePostTasks.jsx";
import { TimerContext } from "../components/TimerContext.jsx";
import Divider from "@mui/material/Divider";
import AddIcon from "@mui/icons-material/Add";
import useGetTasks from "../hooks/useGetTasks.jsx";
import TaskList from "../components/TaskList.jsx";
import CoffeeIcon from "@mui/icons-material/Coffee";
import StarIcon from "@mui/icons-material/Star";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import axios from "axios";
import ToolTip from "../components/ToolTip";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user, userDetails } = useContext(AuthContext);
  const {
    isPomodoro,
    alignment,
    pomodoroTime,
    shortBreakTime,
    longBreakTime,
    longBreakDelay,
    isLongBreak,
    isBreak,
    pomodoroDone,
    setPomodoroDone,
    dailyGoal,
    pomodoro,
  } = useContext(TimerContext);
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("");
  const { saveSettings, loading: settingsLoading } = useGetSettings();
  const { postTask } = usePostTasks();
  const { tasks, getTasks } = useGetTasks();
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("access_token");
  const navigate = useNavigate();
  // const [finishTime, setFinishTime] = useState(new Date());

  useEffect(() => {
    if (user && !settingsLoading) {
      saveSettings(alignment);
    }
  }, [isPomodoro]);

  useEffect(() => {
    if (user) {
      getTasks();
    }
  }, [refresh]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const details = {
      task: task,
      category: category,
    };
    await postTask(details, 1);
    getTasks();
    setTask("");
    setCategory("");
  };

  const timeTillNextLongBreak = () => {
    let timeTillBreak = new Date();
    let lb = isLongBreak.count + 1;
    for (let i = lb; i < longBreakDelay; i++) {
      timeTillBreak.setMinutes(
        timeTillBreak.getMinutes() + pomodoroTime / 60 + shortBreakTime / 60
      );
    }
    if (isBreak && !isLongBreak.state) {
      timeTillBreak.setMinutes(
        timeTillBreak.getMinutes() + shortBreakTime / 60
      );
    }
    timeTillBreak.setMinutes(timeTillBreak.getMinutes() + pomodoroTime / 60);

    return timeTillBreak;
  };

  const totalTime = () => {
    let finishTime = new Date();

    let lb = isLongBreak.count + 1;

    for (let i = 1; i < remainingPomodoros; i++) {
      if (lb === longBreakDelay) {
        finishTime.setMinutes(
          finishTime.getMinutes() + pomodoroTime / 60 + longBreakTime / 60
        );
        lb = 1;
      } else {
        finishTime.setMinutes(
          finishTime.getMinutes() + pomodoroTime / 60 + shortBreakTime / 60
        );
        lb++;
      }
    }

    if (isBreak && !isLongBreak.state) {
      finishTime.setMinutes(finishTime.getMinutes() + shortBreakTime / 60);
    }
    if (isLongBreak.state) {
      finishTime.setMinutes(finishTime.getMinutes() + longBreakTime / 60);
    }
    finishTime.setMinutes(finishTime.getMinutes() + pomodoroTime / 60);

    return finishTime;
  };

  const totalPomodoroTime = () => {
    const sum =
      pendingTasks &&
      pendingTasks.reduce((total, obj) => total + obj.remaining_pomodoros, 0);

    const time = (pomodoro * sum) / 60;

    const hours = Math.floor(time / 60);
    const minutes = time % 60;
    const formattedTime = `${hours}h ${minutes}m`;
    if (hours > 0) {
      return formattedTime;
    } else {
      return `${minutes}m`;
    }
  };

  const updateTask = async ({ assigned, remaining }) => {
    try {
      const response = await axios.patch(
        `http://127.0.0.1:8000/user/${userDetails.id}/task/${
          pendingTask && pendingTask.id
        }`,
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

  useEffect(() => {
    const updateTaskAndRefresh = async () => {
      if (pomodoroDone && pendingTask) {
        const addPomodoro = {
          assigned: pendingTask && pendingTask.assigned_pomodoros,
          remaining: pendingTask && pendingTask.remaining_pomodoros - 1,
        };
        await updateTask(addPomodoro);
        setRefresh(!refresh);
      }
    };
    updateTaskAndRefresh();
    setPomodoroDone(false);
  }, [pomodoroDone]);

  const filteredTasks =
    tasks &&
    tasks.filter((task) => {
      const createdAtDate = new Date(task.created_at);
      const today = new Date();

      // Check if the date parts (year, month, day) of createdAtDate are equal to today's date
      return (
        createdAtDate.getFullYear() === today.getFullYear() &&
        createdAtDate.getMonth() === today.getMonth() &&
        createdAtDate.getDate() === today.getDate()
      );
    });

  const pendingTasks =
    filteredTasks &&
    filteredTasks.filter((task) => task.remaining_pomodoros !== 0);

  const doneTasks =
    filteredTasks &&
    filteredTasks.filter((task) => task.remaining_pomodoros === 0);

  const dailyGoalTasks = doneTasks && doneTasks.slice(-dailyGoal);

  const extraCompletedTasks = doneTasks && doneTasks.slice(0, -dailyGoal);

  const pendingTask = pendingTasks && pendingTasks[pendingTasks.length - 1];

  const remainingPomodoros =
    pendingTasks &&
    pendingTasks.reduce((total, task) => total + task.remaining_pomodoros, 0);

  // const finishTime = taskFinishTime(pomodoroTime * remainingPomodoros);
  const finishTime = totalTime();
  const timeTillBreak = timeTillNextLongBreak();

  const currentTask = pendingTasks && pendingTasks[pendingTasks.length - 1];

  // useEffect(() => {
  //   const time = totalTime();
  //   const interval = setInterval(() => {
  //     setFinishTime(time);
  //   }, 1000);

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <Box
      // border={1}
      sx={{
        overflow: "auto",
        // padding: "20px",
      }}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Timer task={currentTask} />
      <Divider style={{ width: "850px" }}>
        <Typography variant="body1" color="initial">
          TODO{" "}
          {pendingTasks && pendingTasks.length > 0
            ? `- ${pendingTasks.length} / ${totalPomodoroTime()}`
            : null}
        </Typography>
      </Divider>
      {user ? (
        <Box
          // border={1}
          sx={{
            width: 850,
            maxWidth: "100%",
            height: "100px",
            display: "flex",
            alignItems: "center",
            margin: "10px",
          }}
        >
          <form
            style={{ display: "flex", alignItems: "center", flex: 1 }}
            onSubmit={handleSubmit}
          >
            <TextField
              // size="small"
              placeholder="Category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              sx={{
                "& input": {
                  padding: "7px",
                  margin: 0,
                },
                width: "200px",
                marginRight: "10px",
              }}
            ></TextField>

            <TextField
              fullWidth
              label=""
              size="small"
              onChange={(e) => setTask(e.target.value)}
              value={task}
              type="text"
              placeholder="Short description"
              // onBlur={() => setTask("")}
              sx={{
                "& input": {
                  padding: "7px",
                  margin: 0,
                  flex: 1,
                },
              }}
              style={{
                borderColor: "black",

                borderWidth: "100px",
                marginRight: "10px",
              }}
            />
            <ToolTip title={"Add <Enter>"} placement={"right-start"}>
              <IconButton
                onClick={handleSubmit}
                type="submit"
                sx={{
                  border: "1px solid",
                  borderRadius: "5px",
                  width: "40px",
                  borderColor: "lightgrey",
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </ToolTip>
          </form>
        </Box>
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            paddingTop: "20px",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", marginTop: "50px" }}>
            <ContentPasteIcon color="primary" />
            <Typography
              variant="body1"
              color="primary"
              sx={{ fontFamily: "sans-serif" }}
            >
              TODO list is empty.
            </Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Typography
              variant="body1"
              color="grey"
              sx={{ fontFamily: "sans-serif", paddingBottom: "50px" }}
            >
              <Button
                onClick={() => navigate("/login")}
                type="text"
                sx={{
                  textTransform: "none",
                  fontFamily: "Sans-serif",
                  fontSize: "14px",
                  height: "30px",
                  "&:hover": {
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                {`Sign In`}
              </Button>
              to start adding tasks now.
            </Typography>
          </Box>
        </Box>
      )}
      {pendingTasks && pendingTasks.length < 1 && (
        <Box sx={{ display: "flex", paddingTop: "20px" }}>
          <ContentPasteIcon color="primary" />
          <Typography
            variant="body1"
            color="primary"
            sx={{ fontFamily: "sans-serif" }}
          >
            TODO list is empty.
          </Typography>
        </Box>
      )}
      {dailyGoalTasks &&
        dailyGoalTasks.length > 0 &&
        pendingTasks &&
        pendingTasks.length === 0 && (
          <Typography
            variant="body1"
            color="grey"
            sx={{ fontFamily: "sans-serif", paddingBottom: "50px" }}
          >
            Congratulations! You have completed all your tasks.
          </Typography>
        )}
      {dailyGoalTasks &&
        dailyGoalTasks.length === 0 &&
        pendingTasks &&
        pendingTasks.length === 0 && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography
              variant="body1"
              color="grey"
              sx={{ fontFamily: "sans-serif", paddingBottom: "50px" }}
            >
              Try to add some tasks. Use the form above.
            </Typography>
            <Divider style={{ width: "850px" }} />
          </Box>
        )}
      <Box>
        {Array.isArray(pendingTasks) &&
          pendingTasks.map((task, index) => (
            <Box key={index}>
              <TaskList
                key={task.id}
                task={task}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            </Box>
          ))}
      </Box>
      {((pendingTasks && pendingTasks.length > 1) ||
        (pendingTasks &&
          pendingTasks[0] &&
          pendingTasks[0].remaining_pomodoros > 1)) && (
        <Divider style={{ width: "850px" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // border: "1px solid",
              borderColor: "divider",
              borderRadius: 2,
              bgcolor: "background.paper",
              padding: "20px 0px 20px 0px",
              color: "text.secondary",
              "& svg": {
                m: 1,
              },
            }}
          >
            <CoffeeIcon fontSize="SMALL" />
            <Typography variant="body1" color="initial" fontSize={10}>
              NEXT LONG BREAK -{" "}
              {timeTillBreak.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </Typography>
            <Divider
              style={{
                paddingLeft: "10px",
                borderColor: "rgba(0, 0, 0, 0.5)",
              }}
              orientation="vertical"
              variant="middle"
              flexItem
            />
            <StarIcon fontSize="SMALL" />
            <Typography
              variant="body1"
              color="initial"
              fontSize={10}
              sx={{ paddingRight: "10px" }}
            >
              FINISH TIME -{" "}
              {finishTime.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}{" "}
            </Typography>
          </Box>
        </Divider>
      )}
      {pendingTasks &&
        pendingTasks.length === 1 &&
        pendingTasks[0].remaining_pomodoros === 1 && (
          <Divider style={{ width: "850px" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                // border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                bgcolor: "background.paper",
                padding: "20px 0px 20px 0px",
                color: "text.secondary",
                "& svg": {
                  m: 1,
                },
              }}
            >
              <StarIcon fontSize="SMALL" />
              <Typography
                variant="body1"
                color="initial"
                fontSize={10}
                sx={{ paddingRight: "10px" }}
              >
                FINISH TIME -{" "}
                {finishTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
              </Typography>
            </Box>
          </Divider>
        )}
      {doneTasks && doneTasks.length > 0 && (
        <Box>
          <Box sx={{ paddingTop: "10px" }}>
            <Divider style={{ width: "850px" }}>
              {" "}
              <Typography variant="body1" color="initial">
                Done - {doneTasks.length}
              </Typography>{" "}
            </Divider>
          </Box>

          <Box
            sx={{
              width: "850px",
              display: "flex",
              justifyContent: "flex-start",
              margin: "10px 0 10px 0",
            }}
          >
            <Typography
              sx={{ width: "170px", opacity: "0.6" }}
              fontSize={12}
              variant="body1"
              color="initial"
            >
              CATEGORY
            </Typography>

            <Typography
              sx={{ opacity: "0.6" }}
              fontSize={12}
              variant="body1"
              color="initial"
            >
              DESCRIPTION
            </Typography>
          </Box>
        </Box>
      )}
      {extraCompletedTasks && extraCompletedTasks.length > 0 && (
        <Divider style={{ width: "850px" }} />
      )}
      <Box>
        {Array.isArray(extraCompletedTasks) &&
          extraCompletedTasks.map((task, index) => (
            // <Box key={index}>
            <TaskList
              key={task.id}
              task={task}
              refresh={refresh}
              setRefresh={setRefresh}
              index={index}
            />
            // </Box>
          ))}
      </Box>
      {dailyGoalTasks && dailyGoalTasks.length > 0 && (
        <Box sx={{ display: "flex", alignItems: "center", width: "850px" }}>
          <Box sx={{ marginRight: "auto" }}>
            <Divider style={{ width: "370px", backgroundColor: "green" }} />
          </Box>
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
            <StarIcon fontSize="SMALL" style={{ color: "green" }} />
            <Typography variant="body1" color="green" fontSize={10}>
              Daily Goal - {dailyGoal}
            </Typography>
          </Box>
          <Box sx={{ marginLeft: "auto", paddingLeft: "10px" }}>
            <Divider style={{ width: "370px", backgroundColor: "green" }} />
          </Box>
        </Box>
      )}

      <Box>
        {Array.isArray(dailyGoalTasks) &&
          dailyGoalTasks.map((task, index) => (
            // <Box key={index}>
            <TaskList
              key={task.id}
              task={task}
              refresh={refresh}
              setRefresh={setRefresh}
              index={index}
            />
            // </Box>
          ))}
      </Box>
      <MyCarousel />
    </Box>
  );
};

export default Home;
