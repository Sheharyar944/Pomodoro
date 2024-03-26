import React from "react";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackBar = () => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <div>
      <Snackbar
        // key={messageInfo ? messageInfo.key : undefined}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSnack}
        autoHideDuration={4000}
        onClose={handleSnackClose}
        TransitionProps={{ onExited: handleExited }}
        // message={messageInfo ? messageInfo.message : undefined}
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
    </div>
  );
};

export default SnackBar;
