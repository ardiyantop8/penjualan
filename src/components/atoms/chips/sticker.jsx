import { Chip } from "@mui/material";
import { twMerge } from "tailwind-merge";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export default function ChipSticker({
  label,
  startIcon,
  type,
  className,
  bgColor,
  ...props
}) {
  return (
    <Chip
      label={label}
      icon={
        type === "success" ? (
          <CheckCircleIcon color="#27AE60" />
        ) : type === "danger" ? (
          <CancelIcon color="error" />
        ) : (
          startIcon
        )
      }
      sx={{
        fontWeight: 600,
        color:
          type === "success"
            ? "#27AE60"
            : type === "danger"
            ? "#E84040"
            : props.color ?? "white",
        backgroundColor:
          type === "success"
            ? "#E0FAEC"
            : type === "danger"
            ? "#FFEAEA"
            : bgColor,
        borderRadius: "8px",
        padding: "8px 0px 8px 8px",
        ".MuiChip-label": {
          paddingX: "8px",
        },
        ".MuiChip-icon": {
          margin: 0,
        },
        ...props.sx,
      }}
      className={twMerge("text-sm cursor-auto w-fit", className)}
      {...props}
    />
  );
}
