import { Button } from "@mui/material";
import { darken } from "@mui/material";

export const ButtonDefault = ({
  onClick,
  children,
  model,
  color,
  sx,
  ...restProps
}) => {
  return (
    <Button
      sx={{
        borderRadius: "10px",
        fontWeight: "700",
        backgroundColor: `${
          model == "fill"
            ? color
            : model == "outline" || model == "text"
            ? "#FFFFFF"
            : null
        }`,
        color: `${
          model == "fill"
            ? "#FFFFFF"
            : model == "outline" || model == "text"
            ? color
            : null
        }`,
        border: `${model == "outline" ? `1px solid ${color}` : null}`,
        ":hover": {
          backgroundColor: `${
            model == "fill"
              ? darken(color, 0.1)
              : model == "outline"
              ? darken("#FFFFFF", 0.1)
              : darken("#FFFFFF", 0.02)
          }`,
        },
        ":active": {
          backgroundColor: `${
            model == "fill" ? darken(color, 0.1) : darken("#FFFFFF", 0.1)
          }`,
        },
        ":disabled": {
          color: "rgba(0, 0, 0, 0.26)",
          boxShadow: "none",
          ...(model === "fill" && { backgroundColor: "rgba(0, 0, 0, 0.12)" }),
          ...(model === "outline" && { border: "1px solid rgba(0, 0, 0, 0.26)" }),
        },
        ...sx,
      }}
      className="w-full cursor-pointer"
      onClick={onClick}
      {...restProps}
    >
      {children}
    </Button>
  );
};
