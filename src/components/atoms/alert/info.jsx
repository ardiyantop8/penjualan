import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import { IconInfo } from "../icons/info";

export const AlertInfo = ({
  children,
  variant,
  title,
  color,
  icon,
  sx,
  onClose,
  childrenStyle = {},
  ...props
}) => {
  const isStyled = Object.keys(childrenStyle).length > 0;
  return (
    <Alert
      variant={variant}
      icon={icon ?? <IconInfo color="#00529C" isSmall />}
      severity="info"
      sx={{
        backgroundColor: color ?? "#EAF5FF",
        borderRadius: "8px",
        ".MuiAlert-icon": {
          alignSelf: "center",
        },
        ".MuiAlert-message": {
          width: "100%",
        },
        ...sx,
      }}
      onClose={onClose}
      {...props}
    >
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {isStyled ? <span style={childrenStyle}>{children}</span> : children}
    </Alert>
  );
};
