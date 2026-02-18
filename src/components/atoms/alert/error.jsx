import { Alert } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import { CircleCross } from "../icons/circle-cross";

export const AlertError = ({
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
      icon={icon ?? <CircleCross color="#E84040" />}
      severity="info"
      sx={{
        backgroundColor: color ?? "#FFEAEA",
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
