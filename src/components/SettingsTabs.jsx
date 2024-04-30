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
import { Box, Slide } from "@mui/material";
import { TimerContext } from "./TimerContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

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
    pomodoro,
    setPomodoro,
    setShortBreak,
    setLongBreak,
    initialPomodoro,
    initialShortBreak,
    initialLongBreak,
    isInputFocused,
    isFieldChanged,
    setIsFieldChanged,
  } = useContext(TimerContext);

  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const [snackPack, setSnackPack] = useState([]);
  const [openSnack, setOpenSnack] = useState(false);
  const [messageInfo, setMessageInfo] = useState(undefined);

  useEffect(() => {
    if (snackPack.length && !messageInfo) {
      setMessageInfo({ ...snackPack[0] });
      setSnackPack((prev) => prev.slice(1));
      setOpenSnack(true);
      setIsFieldChanged(false);
    } else if (snackPack.length && messageInfo && openSnack) {
      setOpenSnack(false);
    }
  }, [snackPack, messageInfo, openSnack]);

  useEffect(() => {
    if (!isInputFocused && pomodoro && isFieldChanged) {
      handleClick("Settings successfully changed");
    }
  }, [isInputFocused]);

  const handleClick = (message) => {
    setSnackPack((prev) => [...prev, { message, key: new Date().getTime() }]);
  };

  const handleSnackClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnack(false);
  };

  const handleExited = () => {
    setMessageInfo(undefined);
  };

  useEffect(() => {
    setPomodoro(initialPomodoro);
    setShortBreak(initialShortBreak);
    setLongBreak(initialLongBreak);
  }, []);

  useEffect(() => {
    settingsMode();
  }, [value, pathname]);

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
    <Box>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        TransitionProps={{ onExited: handleExited, direction: "left" }}
        TransitionComponent={Slide}
      >
        <Alert
          onClose={handleSnackClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          {messageInfo ? messageInfo.message : undefined}
        </Alert>
      </Snackbar>
      <Box
        marginTop={10}
        marginBottom={5}
        // border={1}
        sx={{ width: "80%", margin: "50px auto" }}
      >
        <Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider", padding: "0px" }}>
            <Tabs
              sx={{ padding: "0px" }}
              value={value}
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
            <TimerSettings handleClick={handleClick} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={1}>
            <NotificationSettings handleClick={handleClick} />
          </CustomTabPanel>

          <CustomTabPanel value={value} index={2}>
            Item Three
          </CustomTabPanel>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsTabs;
