import * as React from "react";
import Box from "@mui/material/Box";
import Popper from "@mui/material/Popper";
import Fade from "@mui/material/Fade";
import { IconInfoHover } from "../icons/info-hover";
import { Button } from "@mui/material";
import { darken } from "@mui/material";

export default function ButtonHover({ children }) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const onMouseOver = (event) => {
    setAnchorEl(event.currentTarget);
    setOpen((previousOpen) => !previousOpen);
  };

  const onMouseOut = () => {
    setOpen(false);
  };

  const canBeOpen = open && Boolean(anchorEl);
  const id = canBeOpen ? "transition-popper" : undefined;

  return (
    <div>
      <Button
        onMouseOver={onMouseOver}
        onMouseOut={onMouseOut}
        sx={{
          backgroundColor: "#FF9800",
          color: "#FFFFFF",
          borderRadius: "5px",
          px: "10px",
          py: "10px",
          ":hover": {
            backgroundColor: darken("#FF9800", 0.1),
          },
          ":active": {
            backgroundColor: darken("#FF9800", 0.1),
          },
        }}
        variant="contained"
      >
        <IconInfoHover />
      </Button>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        placement="top"
        transition
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                border: 1,
                p: 1,
                borderRadius: "5px",
                bgcolor: "background.paper",
                mb: 1,
              }}
            >
              {children}
            </Box>
          </Fade>
        )}
      </Popper>
    </div>
  );
}
