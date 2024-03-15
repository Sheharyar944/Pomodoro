import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import React, { useEffect, useState, useContext } from "react";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import TimerSettings from "./TimerSettings";
import NotificationSettings from "./NotificationSettings";
import { useNavigate, useLocation } from "react-router-dom";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { TimerContext } from "./TimerContext";
import { AuthContext } from "./AuthContext";
import useGetSettings from "../hooks/useGetSettings";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const SettingsTabs = () => {
  const {
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    isActive,
    isBreak,
    isPomodoro,
    isDisabled,
    longBreakDelay,
    setLongBreakDelay,
    setDailyGoal,
    pomodoro,
    setPomodoro,
    shortBreak,
    setShortBreak,
    longBreak,
    setLongBreak,
    initialPomodoro,
    setInitialPomodoro,
    initialShortBreak,
    setInitialShortBreak,
    initialLongBreak,
    setInitialLongBreak,
    playAlarmSound,
    setPlayAlarmSound,
    queueUpdate,
  } = useContext(TimerContext);
  const [open, setOpen] = React.useState(false);
  const [longBreakDelayValue, setLongBreakDelayValue] = useState(0);

  const [dailyGoalValue, setDailyGoalValue] = useState(0);
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const { user } = useContext(AuthContext);
  const { saveSettings } = useGetSettings();

  useEffect(() => {
    setPomodoro(initialPomodoro);
    setShortBreak(initialShortBreak);
    setLongBreak(initialLongBreak);
    setLongBreakDelayValue(longBreakDelay);
  }, []);

  useEffect(() => {
    settingsMode();
  }, [value, pathname]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    console.log("inputfield has lose focus");

    queueUpdate(parseInt(pomodoro), parseInt(shortBreak), parseInt(longBreak));

    if (!isActive && isDisabled) {
      setPomodoroTime(pomodoro);
      setShortBreakTime(shortBreak);
      setLongBreakTime(longBreak);
    }
    if (!isPomodoro) {
      setPomodoroTime(pomodoro);
    }
    if (!isBreak) {
      setShortBreakTime(shortBreak);
      setLongBreakTime(longBreak);
    }

    setInitialPomodoro(pomodoro);
    setInitialLongBreak(longBreak);
    setInitialShortBreak(shortBreak);

    setLongBreakDelay(longBreakDelayValue);
    setDailyGoal(dailyGoalValue);
    setOpen(false);

    if (user) {
      setTimeout(() => {
        saveSettings();
      }, 0);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const settingsMode = () => {
    if (pathname === "/settings/timer") {
      setValue(0);
    }
    if (pathname === "/settings/notification") {
      setValue(1);
    }
    if (pathname === "/settings/application") {
      setValue(2);
    }
  };

  return (
    <Box
      marginTop={10}
      marginBottom={5}
      sx={{ width: "80%", margin: "50px auto" }}
    >
      <Box>
        <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "0px" }}>
          <Tabs
            sx={{ padding: "0px" }}
            value={value}
            //   onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab
              sx={{ padding: "0px 16px" }}
              icon={<WatchLaterIcon />}
              label="Timer"
              onClick={() => navigate("/settings/timer")}
            />
            <Tab
              sx={{ padding: "0px 16px" }}
              icon={<NotificationsIcon />}
              label="Notifications"
              onClick={() => navigate("/settings/notification")}
            />
            <Tab
              sx={{ padding: "0px 16px" }}
              icon={<AppSettingsAltIcon />}
              label="Application"
              onClick={() => navigate("/settings/application")}
            />
          </Tabs>
        </Box>

        <CustomTabPanel value={value} index={0}>
          <TimerSettings handleClose={handleClose} />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <NotificationSettings
            playAlarmSound={playAlarmSound}
            setPlayAlarmSound={setPlayAlarmSound}
          />
        </CustomTabPanel>

        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>

        {/* <Box>
          <Button
            onClick={() => {
              handleClose();
              navigate("/");
            }}
            style={{
              color: "#232946",
              paddingLeft: 50,
              paddingRight: 50,
              borderWidth: 1,
              marginRight: 15,
              marginLeft: 15,
              borderColor: "black",
            }}
            variant="outlined"
          >
            Exit
          </Button>
        </Box> */}
      </Box>
    </Box>
  );
};

export default SettingsTabs;
