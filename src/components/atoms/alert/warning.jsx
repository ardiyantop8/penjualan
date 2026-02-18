import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import { IconInfo } from "../icons/info";

export const AlertWarning = ({
  children,
  variant,
  title,
  color,
  icon,
  sx,
  onClose,
  ...props
}) => {
  return (
    <Alert
      variant={variant}
      icon={icon ?? <IconInfo color="#F2C94C" isSmall />}
      severity="info"
      sx={{
        backgroundColor: color ?? "#FDF2D0",
        borderRadius: "8px",
        ...sx,
      }}
      onClose={onClose}
      {...props}
    >
      {title ? <AlertTitle>{title}</AlertTitle> : null}
      {children}
    </Alert>
  );
};
