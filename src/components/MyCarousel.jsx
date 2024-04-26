import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button, Typography, Box, ListItem } from "@mui/material";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from "react-responsive-carousel";

const MyCarousel = (props) => {
  const items1 = [
    "Alleviate anxiety linked to beginning",
    "Enhance focus and concentration by cutting down on interruptions",
    "Increase awareness of your decisions",
    "Boost motivation and keep it constant",
    "Bolster the determination to achieve your goals",
    "Refine the estimation process, both in qualitative and quantitative terms",
    "Improve your work or study process",
    "Strengthen your resolve to keep on applying yourself in the face of complex situations",
  ];
  const items2 = [
    "Start the Pomodoro timer",
    "Work until the Pomodoro rings",
    "Take a short break (3-5 minutes)",
  ];

  const items3 = [
    "If a task takes more than 5–7 Pomodoros, break it down",
    "If it takes less than one Pomodoro, add it up, and combine it with another task",
    "Once a Pomodoro begins, it has to ring",
    "The next Pomodoro will go better",
    "Login to the service and track your progress",
    "The Pomodoro Technique shouldn’t be used for activities you do in your free time. Enjoy free time!",
  ];

  return (
    <Box
    //  border={1}
    >
      <Carousel
        sx={{ height: "400px", width: "850px" }}
        navButtonsAlwaysVisible={true}
        autoPlay={false}
        animation="slide"
      >
        <Box
          sx={{
            height: "400px",
            width: "850px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              height: "400px",
              width: "700px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#6c6c79", paddingBottom: "10px" }}
            >
              What is it?
            </Typography>
            <Typography
              variant="body1"
              // color="initial"
              sx={{
                color: "#6c6c79",
              }}
            >
              The Pomodoro Technique is a time management method that can be
              used for any task. For many people, time is an enemy. The anxiety
              triggered by “the ticking clock”, especially when it involves a
              deadline, leads to ineffective work and study habits which in turn
              lead to procrastination.
              <br />
              <br />
              The aim of the Pomodoro Technique is to use time as a valuable
              ally in accomplishing what we want to do in the way we want to do
              it, and to enable us to improve continually the way we work or
              study.
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "400px",
            width: "850px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "400px",
              width: "700px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#6c6c79", paddingBottom: "10px" }}
            >
              The Goals
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: "#6c6c79",
              }}
            >
              The Pomodoro Technique will provide a simple tool/process for
              improving productivity (your own and that of your team members)
              which can do the following:
            </Typography>
            <ul
              style={{
                color: "#6c6c79",
                leftPadding: "0px",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
            >
              {items1.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Box>
        </Box>
        <Box
          sx={{
            height: "400px",
            width: "850px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "400px",
              width: "700px",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#6c6c79", paddingBottom: "10px" }}
            >
              The Basics
            </Typography>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: "#6c6c79",
              }}
            >
              At the beginning of each day select the tasks you need to complete
              and put them on the TODO list above. Start working:
            </Typography>
            <ol
              style={{
                color: "#6c6c79",
                leftPadding: "0px",
                fontSize: "16px",
                fontFamily: "sans-serif",
              }}
            >
              {items2.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
            <Typography
              variant="body1"
              color="initial"
              sx={{
                color: "#6c6c79",
              }}
            >
              Keep on working, Pomodoro after Pomodoro, until the task at hand
              is finished. Every 4 Pomodoros take a longer break, (15–30
              minutes).
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            height: "400px",
            width: "850px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              height: "400px",
              width: "700px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              // alignItems: "center",
            }}
          >
            <Typography
              variant="h5"
              align="center"
              sx={{ color: "#6c6c79", paddingBottom: "10px" }}
            >
              Rules & TIps
            </Typography>

            <ul
              style={{
                color: "#6c6c79",
                fontSize: "16px",
                leftPadding: "0px",
                fontFamily: "sans-serif",
              }}
            >
              {items3.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Box>
        </Box>
      </Carousel>
    </Box>
  );
};

export default MyCarousel;
