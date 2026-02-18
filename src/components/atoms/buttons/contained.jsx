import { Button } from "@mui/material";
import { darken } from "@mui/material";
import { twMerge } from "tailwind-merge";

export const ButtonContained = ({
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
      variant="contained"
      sx={{
        borderRadius: "10px",
        fontWeight: "700",
        backgroundColor:
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
        color: "#FFFFFF",
        ":hover": {
          backgroundColor:
            colorType === "primary"
              ? darken("#00529C", 0.1)
              : colorType === "secondary"
              ? darken("#ED6E12", 0.1)
              : colorType === "danger"
              ? darken("#E84040", 0.1)
              : colorType === "success"
              ? darken("#219653", 0.1)
              : colorType === "default"
              ? darken("#BDBDBD", 0.1)
              : null,
        },
        ":active": {
          backgroundColor:
            colorType === "primary"
              ? darken("#00529C", 0.1)
              : colorType === "secondary"
              ? darken("#ED6E12", 0.1)
              : colorType === "danger"
              ? darken("#E84040", 0.1)
              : colorType === "success"
              ? darken("#219653", 0.1)
              : colorType === "default"
              ? darken("#BDBDBD", 0.1)
              : null,
        },
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
