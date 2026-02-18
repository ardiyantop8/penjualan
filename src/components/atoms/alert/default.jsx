import { Box, Typography } from "@mui/material";
import IconExclamation from "public/icons/exclamation.svg";

export const AlertDefault = ({
  children,
  title,
  color,
  icon,
  sx = {},
  iconStyle = {},
  containerStyle = {},
  contentStyle = {},
  ...props
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        backgroundColor: color ?? "#EDEDED",
        borderRadius: "8px",
        padding: "16px 18px",
        ...sx,
        ...containerStyle,
      }}
      {...props}
    >
      <span
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: 14,
          background: { ...iconStyle },
        }}
      >
        {icon ?? <IconExclamation style={{ color: { ...iconStyle } }} />}
      </span>
      <Box sx={{ flex: 1, ...contentStyle }}>
        {title ? (
          <Typography fontWeight={600} sx={{ mb: 0.5 }}>
            {title}
          </Typography>
        ) : null}
        {children}
      </Box>
    </Box>
  );
};
