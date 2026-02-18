import { Button } from "@mui/material";

const ButtonIcon = ({
  children,
  onClick,
  className,
  variant,
  sx,
  ...props
}) => {
  return (
    <Button
      size="small"
      onClick={onClick}
      className={className}
      sx={{
        padding: "10px 16px",
        borderRadius: "10px",
        width: "57px",
        height: "36px",
        ...sx,
      }}
      {...props}
      variant={variant || "outlined"}
    >
      {children}
    </Button>
  );
};

export default ButtonIcon;
