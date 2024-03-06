import React, { useContext } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header.jsx";
import Divider from "@mui/material/Divider";
import { Box, Button, Typography, IconButton } from "@mui/material";
import useIsLoggedIn from "../hooks/useIsLoggedIn.jsx";
import useLogout from "../hooks/useLogout.jsx";
import { AuthContext } from "./AuthContext.jsx";
import XIcon from "@mui/icons-material/X";
import FacebookIcon from "@mui/icons-material/Facebook";
import RedditIcon from "@mui/icons-material/Reddit";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import AppleIcon from "@mui/icons-material/Apple";
import DropDownMenu from "./DropDownMenu.jsx";
import SettingsIcon from "@mui/icons-material/Settings";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

const Root = () => {
  const navigate = useNavigate();
  const logout = useLogout();
  const isLoggedIn = useIsLoggedIn();
  const { userDetails } = useContext(AuthContext);

  const location = useLocation();
  const { pathname } = location;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box>
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          backgroundColor: "#fff",
          zIndex: 1000,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
        }}
      >
        <Box>
          <Header />
        </Box>

        <Box sx={{ display: "flex" }}>
          {/* {isLoggedIn && (
            <Button
              onClick={() => navigate(`/Profile/${userDetails.id}`)}
              style={{ color: "black" }}
            >
              {userDetails.email}
            </Button>
          )} */}

          {/* Stats button */}
          {pathname === "/stats" ? (
            <Box borderBottom={2} borderColor={"#6c6c79"}>
              <Button
                onClick={() => navigate("/stats")}
                variant="text"
                startIcon={<BarChartIcon />}
                sx={{
                  color: "#6c6c79",
                  textTransform: "capitalize",
                  margin: "0 10px 0 10px",
                  fontSize: "15px",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                Stats
              </Button>
            </Box>
          ) : (
            <Box borderBottom={2} borderColor={"white"}>
              <Button
                onClick={() => navigate("/stats")}
                variant="text"
                startIcon={<BarChartIcon />}
                sx={{
                  color: "#6c6c79",
                  textTransform: "capitalize",
                  margin: "0 10px 0 10px",
                  fontSize: "15px",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                Stats
              </Button>
            </Box>
          )}

          {/* Feedback button */}

          {pathname === "/feedback" ? (
            <Box borderBottom={2} borderColor={"#6c6c79"}>
              <Button
                onClick={() => navigate("/feedback")}
                variant="text"
                startIcon={<FeedbackIcon />}
                sx={{
                  color: "#6c6c79",
                  textTransform: "capitalize",
                  margin: "0 10px 0 10px",
                  fontSize: "15px",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                Feedback
              </Button>
            </Box>
          ) : (
            <Box borderBottom={2} borderColor={"white"}>
              <Button
                onClick={() => navigate("/feedback")}
                variant="text"
                startIcon={<FeedbackIcon />}
                sx={{
                  color: "#6c6c79",
                  textTransform: "capitalize",
                  margin: "0 10px 0 10px",
                  fontSize: "15px",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                Feedback
              </Button>
            </Box>
          )}

          {/* settings button */}
          {pathname === "/settings" ? (
            <Box borderBottom={2} borderColor={"#6c6c79"}>
              <Button
                onClick={() => navigate("/settings")}
                variant="text"
                startIcon={<SettingsIcon />}
                sx={{
                  color: "#6c6c79",
                  textTransform: "capitalize",
                  margin: "0 10px 0 10px",
                  fontSize: "15px",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                Settings
              </Button>
            </Box>
          ) : (
            <Box borderBottom={2} borderColor={"white"}>
              <Button
                onClick={() => navigate("/settings")}
                variant="text"
                startIcon={<SettingsIcon />}
                sx={{
                  color: "#6c6c79",
                  textTransform: "capitalize",
                  margin: "0 10px 0 10px",
                  fontSize: "15px",
                  "&:hover": {
                    color: "black",
                    backgroundColor: "white", // Change text color to black on hover
                  },
                }}
              >
                Settings
              </Button>
            </Box>
          )}
          {/* Drop down menu */}
          {isLoggedIn ? (
            <DropDownMenu />
          ) : (
            <Button
              startIcon={<AccountCircleIcon />}
              onClick={() => navigate("/login")}
              variant="text"
              sx={{
                color: "#6c6c79",
                textTransform: "none",
                "&:hover": {
                  color: "black",
                  backgroundColor: "white", // Change text color to black on hover
                },
              }}
            >
              {`Sign up / Sign in`}
            </Button>
          )}
        </Box>
      </Box>

      <Divider />
      <Box>
        <Outlet />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "rgba(10, 200, 40, 0.1)",
              },
              borderRadius: "10%",
              fontSize: "20px",
              width: "182px",
            }}
            color="default"
            aria-label="twitter"
          >
            <AppleIcon
              sx={{ width: "34px", height: "34px", paddingBottom: "4px" }}
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box
                flex={1}
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  fontSize: "10px",
                }}
              >
                Download on the
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  fontSize: "20px",
                }}
                flex={3}
              >
                Mac App Store
              </Box>
            </Box>
          </IconButton>
        </Box>

        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "50px",
            width: "182px",
            display: "flex",
            justifyContent: "flex-start",
          }}
          aria-label="twitter"
        >
          <MicrosoftIcon
            sx={{ width: "34px", height: "34px", paddingBottom: "4px" }}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Box
              flex={1}
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                fontSize: "10px",
              }}
            >
              Get it from
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                fontSize: "20px",
              }}
              flex={3}
            >
              Microsoft
            </Box>
          </Box>
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <IconButton
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "20px",
          }}
          aria-label="twitter"
        >
          <XIcon sx={{ height: "20px", paddingBottom: "3px" }} />
          Tweet
        </IconButton>

        <IconButton
          aria-label="twitter"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "20px",
          }}
        >
          <FacebookIcon sx={{ height: "24px", paddingBottom: "3px" }} />
          Share 1437
        </IconButton>
        <IconButton
          aria-label="twitter"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "20px",
          }}
        >
          <PinterestIcon sx={{ height: "24px", paddingBottom: "3px" }} /> Pin
        </IconButton>
        <IconButton
          aria-label="twitter"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "20px",
          }}
        >
          <RedditIcon sx={{ height: "24px", paddingBottom: "3px" }} /> Share 99
        </IconButton>
        <IconButton
          aria-label="twitter"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "20px",
          }}
        >
          <TelegramIcon sx={{ height: "24px", paddingBottom: "3px" }} /> Send
        </IconButton>
        <IconButton
          aria-label="twitter"
          sx={{
            "&:hover": {
              backgroundColor: "rgba(10, 200, 40, 0.1)",
            },
            borderRadius: "10%",
            fontSize: "20px",
          }}
        >
          <WhatsAppIcon sx={{ height: "24px", paddingBottom: "3px" }} /> Send
        </IconButton>
      </Box>
      <Box
        sx={{ textAlign: "center", display: "flex", justifyContent: "center" }}
        padding={1}
      >
        <a
          href=""
          style={{
            textDecoration: "none",
            fontSize: "18px",
            fontFamily: "sans-serif",
            // Add any other styles you want
          }}
        >
          Version 22.0.4
        </a>
        <span style={{ margin: "0 5px" }}>•</span>
        <a
          href=""
          style={{
            textDecoration: "none",
            fontSize: "18px",
            fontFamily: "sans-serif",
            // Add any other styles you want
          }}
        >
          Privacy Policy
        </a>
        <span style={{ margin: "0 5px" }}>•</span>
        <a
          href=""
          style={{
            textDecoration: "none",
            fontSize: "18px",
            fontFamily: "sans-serif",
            // Add any other styles you want
          }}
        >
          Terms and Conditions
        </a>
        <span style={{ margin: "0 5px" }}>•</span>
        <a
          href=""
          style={{
            textDecoration: "none",
            fontSize: "18px",
            fontFamily: "sans-serif",
            // Add any other styles you want
          }}
        >
          Slack Community
        </a>
        <span style={{ margin: "0 5px" }}>•</span>
        <a
          href=""
          style={{
            textDecoration: "none",
            fontSize: "18px",
            fontFamily: "sans-serif",
            // Add any other styles you want
          }}
        >
          dummy@gmail.com
        </a>
        <Typography variant="body2" color="initial">
          2024
        </Typography>
      </Box>
      <Box paddingBottom={3}>
        <Typography
          sx={{ textAlign: "center" }}
          variant="body2"
          color="initial"
        >
          Pomodoro-Tracker is not related to the Pomodoro Technique™/Pomodoro™’s
          trademark holder Cirillo Company and respects its trademarks.
        </Typography>
        <Typography
          sx={{ textAlign: "center" }}
          variant="body2"
          color="initial"
        >
          Pomodoro Technique® and Pomodoro® are registered trademarks of
          Francesco Cirillo.
        </Typography>
        <Typography
          sx={{ textAlign: "center" }}
          variant="body2"
          color="initial"
        >
          All logos and marks contained herein are the property of their
          respective owners.
        </Typography>
      </Box>
    </Box>
  );
};

export default Root;
