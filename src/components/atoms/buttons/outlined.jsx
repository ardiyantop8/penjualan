import { Button } from "@mui/material";
import { twMerge } from "tailwind-merge";

export const ButtonOutlined = ({
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
      variant="outlined"
      sx={{
        borderRadius: "10px",
        fontWeight: "700",
        color:
          colorType === "primary"
            ? "#00529C"
            : colorType === "secondary"
            ? "#ED6E12"
            : colorType === "default"
            ? "#BDBDBD"
            : colorType === "danger"
            ? "#E84040"
            : colorType === "success"
            ? "#219653"
            : null,
        border:
          colorType === "primary"
            ? `1px solid #00529C`
            : colorType === "secondary"
            ? `1px solid #ED6E12`
            : colorType === "default"
            ? `1px solid #BDBDBD`
            : colorType === "danger"
            ? "1px solid #E84040"
            : colorType === "success"
            ? "1px solid #219653"
            : null,
        ":hover": {
          border:
            colorType === "primary"
              ? `1px solid #00529C`
              : colorType === "secondary"
              ? `1px solid #ED6E12`
              : colorType === "default"
              ? `1px solid #BDBDBD`
              : colorType === "danger"
              ? "1px solid #E84040"
              : colorType === "success"
              ? "1px solid #219653"
              : null,
        },
        ":active": {
          border:
            colorType === "primary"
              ? `1px solid #00529C`
              : colorType === "secondary"
              ? `1px solid #ED6E12`
              : colorType === "default"
              ? `1px solid #BDBDBD`
              : colorType === "danger"
              ? "1px solid #E84040"
              : colorType === "success"
              ? "1px solid #219653"
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
