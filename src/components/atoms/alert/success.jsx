import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import { CircleCheck } from "../icons/circle-check";

export const AlertSuccess = ({
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
      icon={icon ?? <CircleCheck color="#27AE60" />}
      severity="info"
      sx={{
        backgroundColor: color ?? "#E6FFF3",
        borderRadius: "8px",
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
