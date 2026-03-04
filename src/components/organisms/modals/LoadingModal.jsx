import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Backdrop, Box } from "@mui/material";

const LoadingModal = forwardRef((props, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    show: () => setOpen(true),
    hide: () => setOpen(false),
  }));

  return (
    <Backdrop
      open={open}
      sx={{
        color: "#fff",
        zIndex: (theme) => theme.zIndex.modal + 999,
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          background: "white",
          padding: 3,
          borderRadius: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Ganti dengan gif kamu */}
        <img
          src="/images/loading.gif"
          alt="loading"
          style={{ width: 80, height: 80 }}
        />
      </Box>
    </Backdrop>
  );
});

export default LoadingModal;