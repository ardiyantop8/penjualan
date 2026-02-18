import { Box, Card, CardHeader } from "@mui/material";

export const CardWithHeaderFormChild = ({
  children,
  icon,
  label,
  sx,
  endComponent,
  ...restProps
}) => {

  return (
    <Card
      variant="outlined"
      sx={{
        borderRadius: "10px",
        margin: "20px 0",
        padding: "5px 20px",
        overflow: "visible",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <CardHeader
          sx={{ background: "#FFFFFF", color: "#084F8C" }}
          className="px-0"
          avatar={icon}
          title={label}
          titleTypographyProps={{ variant: "h6" }}
        />
        {endComponent ? (
          <div className="flex items-center">{endComponent}</div>
        ) : null}
      </Box>
      <div className="text-sm" {...restProps}>
        {children}
      </div>
    </Card>
  );
};
