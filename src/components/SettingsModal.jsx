import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, TextField, ToggleButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AppSettingsAltIcon from "@mui/icons-material/AppSettingsAlt";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import ToolTip from "./ToolTip";
import TimerSettings from "./TimerSettings";
import NotificationSettings from "./NotificationSettings";
import useGetSettings from "../hooks/useGetSettings";
import { AuthContext } from "./AuthContext";
import { TimerContext } from "./TimerContext";

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
      {value === index && (
        <Box sx={{ p: 3, overflowY: "auto", maxHeight: "300px" }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  padding: "15px",
};

const SettingsModal = () => {
  const {
    setPomodoroTime,
    setShortBreakTime,
    setLongBreakTime,
    isActive,
    isBreak,
    isPomodoro,
    isDisabled,
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
    alignment,
  } = useContext(TimerContext);

  const [open, setOpen] = React.useState(false);
  // const [dailyGoalValue, setDailyGoalValue] = useState(1);
  const { saveSettings } = useGetSettings();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    setPomodoro(initialPomodoro);
    setShortBreak(initialShortBreak);
    setLongBreak(initialLongBreak);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
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

    setOpen(false);
    if (user) {
      console.log("alignment?", alignment);
      setTimeout(() => {
        saveSettings(alignment);
      }, 0);
    }
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <ToolTip title={"settings"} placement={"right-start"}>
        <IconButton
          onClick={handleOpen}
          aria-label="Settings"
          sx={{ color: "black" }}
        >
          <SettingsIcon fontSize="medium" />
        </IconButton>
      </ToolTip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1 }}></Box>
                <Box sx={{ flex: 1 }} borderTop={1}></Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0 10px 0 10px",
                }}
              >
                <Typography variant="body1" color="initial">
                  PREFERENCES
                </Typography>
              </Box>
              <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <Box sx={{ flex: 1 }}></Box>
                <Box borderTop={1} sx={{ flex: 1 }}></Box>
              </Box>
            </Box>
            <Box
              sx={{ borderBottom: 1, borderColor: "divider", padding: "0px" }}
            >
              <Tabs
                sx={{ padding: "0px" }}
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab
                  sx={{ padding: "0px 16px" }}
                  icon={<WatchLaterIcon />}
                  label="Timer"
                  {...a11yProps(0)}
                />
                <Tab
                  sx={{ padding: "0px 16px" }}
                  icon={<NotificationsIcon />}
                  label="Notifications"
                  {...a11yProps(1)}
                />
                <Tab
                  sx={{ padding: "0px 16px" }}
                  icon={<AppSettingsAltIcon />}
                  label="Application"
                  {...a11yProps(2)}
                />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <TimerSettings />
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
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                paddingTop: "15px",
                borderTop: "1px solid",
              }}
            >
              <Button
                onClick={handleClose}
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
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsModal;
