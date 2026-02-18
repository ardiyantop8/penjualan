import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

export const ButtonTextBorderless = ({
  onClick,
  sx,
  className,
  startIcon,
  children,
  colorType,
  ...restProps
}) => {
  return (
    <Button
      variant="text"
      sx={{
        borderRadius: "10px",
        fontWeight: "700",
        color:
          colorType === "primary"
            ? "#00529C"
            : colorType === "secondary"
            ? "#ED6E12"
            : colorType === "danger"
            ? "#E84040"
            : colorType === "success"
            ? "#219653"
            : colorType === "default"
            ? "#BDBDBD"
            : null,
        ":disabled": {
          color: "rgba(0, 0, 0, 0.26)",
          boxShadow: "none",
          backgroundColor: "rgba(0, 0, 0, 0.12)",
        },
        ...sx,
      }}
      className={twMerge("cursor-pointer", className)}
      startIcon={startIcon}
      onClick={onClick}
      disabled={restProps.disabled}
      {...restProps}
    >
      {children}
    </Button>
  );
};
