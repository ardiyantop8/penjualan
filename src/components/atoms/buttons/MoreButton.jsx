import { useState } from "react";
import { IconButton, Menu, MenuItem, Box } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";

export default function MoreButton({ options = [] }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          border: "1px solid #0059A6",
          width: 40,
          height: 40,
          borderRadius: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton
          size="small"
          onClick={handleOpen}
          sx={{ color: "#0059A6" }}
        >
          <MoreVertIcon />
        </IconButton>
      </Box>

      <Menu open={open} anchorEl={anchorEl} onClose={handleClose}>
        {options.map((opt, idx) => (
          <MenuItem
            key={idx}
            onClick={() => {
              handleClose();
              opt.onClick && opt.onClick();
            }}
            disabled={opt.disabled}
            sx={{
              color: opt.disabled
                ? "grey.400"
                : opt.color || "inherit"
            }}
          >
            {opt.icon && <span style={{ marginRight: 8 }}>{opt.icon}</span>}
            {opt.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
