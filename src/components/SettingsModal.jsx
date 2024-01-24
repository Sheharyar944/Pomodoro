import React, { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Divider, IconButton, TextField } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { AuthContext } from "./AuthContext";

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
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const SettingsModal = ({
  pomodoroTime,
  setPomodoroTime,
  shortBreakTime,
  setShortBreakTime,
  longBreakTime,
  setLongBreakTime,
  setTimeLeft,
}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTimeLeft(pomodoro);
    setPomodoroTime(pomodoro);
    setShortBreakTime(shortBreak);
    setLongBreakTime(longBreak);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  //////////////////////////////////////////////////////////////
  const [pomodoro, setPomodoro] = useState(0);
  const [shortBreak, setshortBreak] = useState(0);
  const [longBreak, setlongBreak] = useState(0);

  useEffect(
    () => {
      setPomodoro(pomodoroTime);
      setshortBreak(shortBreakTime);
      setlongBreak(longBreakTime);
    },
    [pomodoroTime],
    [shortBreakTime],
    [longBreakTime]
  );

  const handlePomodoroChange = (e) => {
    setPomodoro(e.target.value);
  };
  const handleShortBreakTimeChange = (e) => {
    setshortBreak(e.target.value);
  };
  const handleLongBreakTimeChange = (e) => {
    setlongBreak(e.target.value);
  };

  //   const handleKeyDown = (e) => {
  //     if (e.key === "Enter") {
  //       getTimer(inputValue);
  //     }
  //   };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  //     /////////////////////////////////////////
  return (
    <div>
      <IconButton
        onClick={handleOpen}
        aria-label="Settings"
        sx={{ color: "black" }}
      >
        <SettingsIcon />
      </IconButton>
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
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Timer" {...a11yProps(0)} />
                <Tab label="Notifications" {...a11yProps(1)} />
                <Tab label="Application" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Settings
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" color="initial">
                  Pomodoro duration:
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{
                    "& > :not(style)": { m: 1, width: "400px" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    value={pomodoro}
                    onChange={handlePomodoroChange}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" color="initial">
                  Short break duration:
                </Typography>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "400px" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    value={shortBreak}
                    onChange={handleShortBreakTimeChange}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" color="initial">
                  Long break duration:
                </Typography>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "400px" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    value={longBreak}
                    onChange={handleLongBreakTimeChange}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" color="initial">
                  Long break delay:
                </Typography>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "400px" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    value={4}
                    // onChange={handleInputChange}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body1" color="initial">
                  Daily goal:
                </Typography>
                <Box
                  component="form"
                  sx={{
                    "& > :not(style)": { m: 1, width: "400px" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="outlined-basic"
                    value={4}
                    // onChange={handleInputChange}
                    variant="outlined"
                  />
                </Box>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "center" }}>
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
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              Item Two
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              Item Three
            </CustomTabPanel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default SettingsModal;
