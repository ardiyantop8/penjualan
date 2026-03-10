import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const ErrorModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [onConfirm, setOnConfirm] = useState(() => {});

  useImperativeHandle(ref, () => ({
    show: (msg = "", callback = () => {}) => {
      setMessage(msg);
      setOnConfirm(() => callback);
      setOpen(true);
    },
    hide: () => {
      setOpen(false);
    },
  }));

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, color: "#d32f2f" }}>
        <ErrorOutlineIcon />
        Error
      </DialogTitle>
      <DialogContent sx={{ py: 3 }}>
        <p style={{ margin: 0, color: "#333" }}>{message}</p>
      </DialogContent>
      <DialogActions sx={{ p: 2 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleConfirm}
          sx={{ textTransform: "none" }}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
});

ErrorModal.displayName = "ErrorModal";

export default ErrorModal;
