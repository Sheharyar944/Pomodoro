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
import MyToggle from "./MyToggle";
import MyToggleButton from "./MyToggleButton";

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

const SettingsModal = ({
  pomodoroTime,
  setPomodoroTime,
  shortBreakTime,
  setShortBreakTime,
  longBreakTime,
  setLongBreakTime,
  setTimeLeft,
  longBreakDelay,
  setLongBreakDelay,
  setDailyGoal,
  isAutoPomodoroChecked,
  setIsAutoPomodoroChecked,
  isActive,
  pomodoro,
  setPomodoro,
  initialPomodoro,
  setInitialPomodoro,
  initialShortBreak,
  setInitialShortBreak,
  initialLongBreak,
  setInitialLongBreak,
  queueUpdate,
  isDisabled,
  isPomodoro,
  isBreak,
  isAutoBreakChecked,
  setIsAutoBreakChecked,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    // setTimeLeft(pomodoro);
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
    // if (isClassicChecked && !isActive) {
    //   setPomodoro(25 * 60);
    //   setShortBreak(5 * 60);
    //   setLongBreak(15 * 60);
    //   setLongBreakDelay(4);
    // }
    setInitialPomodoro(pomodoro);
    setInitialLongBreak(longBreak);
    setInitialShortBreak(shortBreak);

    setLongBreakDelay(longBreakDelayValue);
    setDailyGoal(dailyGoalValue);
    setOpen(false);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //////////////////////////////////////////////////////////////
  // const [pomodoro, setPomodoro] = useState(0);
  const [shortBreak, setShortBreak] = useState(0);
  const [longBreak, setLongBreak] = useState(0);
  const [longBreakDelayValue, setLongBreakDelayValue] = useState(0);
  const [dailyGoalValue, setDailyGoalValue] = useState(0);
  const [isClassicChecked, setIsClassicChecked] = useState(false);

  useEffect(() => {
    setPomodoro(pomodoroTime);
    setShortBreak(shortBreakTime);
    setLongBreak(longBreakTime);
    setLongBreakDelayValue(longBreakDelay);
  }, []);

  useEffect(() => {
    if (isClassicChecked) {
      setPomodoro(25 * 60);
      setShortBreak(5 * 60);
      setLongBreak(15 * 60);
      setLongBreakDelay(4);
    }
  }, [isClassicChecked]);

  const handlePomodoroChange = (e) => {
    setPomodoro(e.target.value * 60);
  };
  const handleShortBreakTimeChange = (e) => {
    setShortBreak(e.target.value * 60);
  };
  const handleLongBreakTimeChange = (e) => {
    setLongBreak(e.target.value * 60);
  };
  const handleLongBreakDelayChange = (e) => {
    setLongBreakDelayValue(e.target.value);
  };
  const handleDailyGoalChange = (e) => {
    setDailyGoalValue(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };

  const handleAutoPomodoro = (event) => {
    setIsAutoPomodoroChecked(event.target.checked);
  };
  const handleAutoBreak = (event) => {
    setIsAutoBreakChecked(event.target.checked);
  };

  const handleSchemeClassic = (event) => {
    setIsClassicChecked(!isClassicChecked);
    setInitialPomodoro(25 * 60);
    setInitialShortBreak(5 * 60);
    setInitialLongBreak(15 * 60);
    setLongBreakDelay(4);
  };

  return (
    <div>
      <ToolTip title={"settings"} placement={"right-start"}>
        <IconButton
          onClick={handleOpen}
          aria-label="Settings"
          sx={{ color: "black" }}
        >
          <SettingsIcon />
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
              <Box>
                <MyToggleButton
                  selected={isClassicChecked}
                  onChange={handleSchemeClassic}
                >
                  classic - 25 5 15 4
                </MyToggleButton>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" color="initial">
                      Pomodoro duration:
                    </Typography>
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    marginRight={2}
                    sx={{
                      "& > :not(style)": { m: 1 },
                      flex: 1,
                      p: 0,
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      value={pomodoro / 60}
                      onChange={handlePomodoroChange}
                      variant="outlined"
                      fullWidth={true}
                      sx={{
                        "& input": {
                          padding: "5px",
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={12}
                    marginLeft={34}
                  >
                    in minutes
                  </Typography>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" color="initial">
                      Short break duration:
                    </Typography>
                  </Box>

                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    marginRight={2}
                    sx={{
                      "& > :not(style)": { m: 1 },
                      flex: 1,
                      p: 0,
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      value={shortBreak / 60}
                      onChange={handleShortBreakTimeChange}
                      variant="outlined"
                      fullWidth={true}
                      sx={{
                        "& input": {
                          padding: "5px",
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={12}
                    marginLeft={34}
                  >
                    in minutes
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" color="initial">
                      Long break duration:
                    </Typography>
                  </Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    marginRight={2}
                    sx={{
                      "& > :not(style)": { m: 1 },
                      flex: 1,
                      p: 0,
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      value={longBreak / 60}
                      onChange={handleLongBreakTimeChange}
                      variant="outlined"
                      fullWidth={true}
                      sx={{
                        "& input": {
                          padding: "5px",
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={12}
                    marginLeft={34}
                  >
                    in minutes
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" color="initial">
                      Short break delay:
                    </Typography>
                  </Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    marginRight={2}
                    sx={{
                      "& > :not(style)": { m: 1 },
                      flex: 1,
                      p: 0,
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      value={longBreakDelayValue}
                      onChange={handleLongBreakDelayChange}
                      variant="outlined"
                      fullWidth={true}
                      sx={{
                        "& input": {
                          padding: "5px",
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={12}
                    marginLeft={34}
                  >
                    in pomodoros
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" color="initial">
                      Daily goal:
                    </Typography>
                  </Box>
                  <Box
                    component="form"
                    onSubmit={handleSubmit}
                    marginRight={2}
                    sx={{
                      "& > :not(style)": { m: 1 },
                      flex: 1,
                      p: 0,
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-basic"
                      value={dailyGoalValue}
                      onChange={handleDailyGoalChange}
                      variant="outlined"
                      fullWidth={true}
                      sx={{
                        "& input": {
                          padding: "5px",
                          margin: 0,
                        },
                      }}
                    />
                  </Box>
                </Box>
                {/* <Box>
                  <Typography
                    variant="body1"
                    color="initial"
                    fontSize={12}
                    marginLeft={34}
                  >
                    in minutes
                  </Typography>
                </Box> */}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" color="initial">
                    Auto start pomodoros:
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: "400px" }}>
                  <MyToggle
                    label={""}
                    isChecked={isAutoPomodoroChecked}
                    handleChange={handleAutoPomodoro}
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" color="initial">
                    Auto start breaks:
                  </Typography>
                </Box>
                <Box sx={{ flex: 1, width: "400px" }}>
                  <MyToggle
                    label={""}
                    isChecked={isAutoBreakChecked}
                    handleChange={handleAutoBreak}
                  />
                </Box>
              </Box>
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
              Item Two
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
