import { Descope } from "@descope/react-sdk";
import { Box, Button, Modal } from "@mui/material";
import React, { useEffect } from "react";

export default function Auth() {
  const [open, setOpen] = React.useState(false);
  const [authInProgress, setAuthInProgress] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    localStorage.removeItem("auth");
  };

  useEffect(() => {
    const authProgress = localStorage.getItem("auth");
    if (authProgress === "in-progress") {
      setAuthInProgress(true);
    } else {
      setAuthInProgress(false);
    }
  });

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #00ffffff",
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Button onClick={handleOpen} variant="contained">
        Login
      </Button>
      <Modal
        open={open || authInProgress}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Descope
            flowId="sign-up-or-in"
            onSuccess={(e) => localStorage.removeItem("auth")}
            onError={(e) => localStorage.removeItem("auth")}
            onReady={(e) => {
              localStorage.setItem("auth", "in-progress");
            }}
          />
        </Box>
      </Modal>
    </div>
  );
}
