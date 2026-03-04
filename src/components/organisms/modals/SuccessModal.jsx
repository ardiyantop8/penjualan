import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogContent, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const SuccessModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  useImperativeHandle(ref, () => ({
    show: (msg) => {
      setMessage(msg);
      setOpen(true);
    },
    hide: () => setOpen(false),
  }));

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogContent
        sx={{
          textAlign: "center",
          padding: 4,
          minWidth: 300,
        }}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <CheckCircleIcon sx={{ fontSize: 70, color: "green" }} />
        </Box>

        <Typography variant="h6" mb={2}>
          {message}
        </Typography>

        <Button
          variant="contained"
          color="success"
          onClick={() => setOpen(false)}
        >
          OK
        </Button>
      </DialogContent>
    </Dialog>
  );
});

export default SuccessModal;