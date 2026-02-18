import { Box, Card, CardHeader } from "@mui/material";

export const CardWithHeader = ({
  children,
  icon,
  label,
  subLabel,
  subLabelColor = "#00529C",
  sx,
  colorHeader,
  endComponent,
  textColor,
  paddingX = "0px",
  endComponentProps,
  ...restProps
}) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        px: 3,
        pb: 4,
        overflow: "visible",
        boxShadow: "none",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingY: "24px",
          paddingX: paddingX,
          ...(label && label.length && {
            paddingY: "24px",
          })
        }}
      >
        <CardHeader
          sx={{ 
            background: colorHeader ? colorHeader : "#FFFFFF", 
            color: "#084F8C", 
            p: 0
          }} // Fix background color syntax
          avatar={icon}
          title={
            <Box>
              <Box
                component="div"
                sx={{
                  fontSize: "20px",
                  fontWeight: 600,
                  color: textColor || "#000000",
                }}
              >
                {label}
              </Box>
              {subLabel && (
                <Box
                  component="div"
                  sx={{
                    fontSize: "14px",
                    fontWeight: 600,
                    color: subLabelColor,
                  }}
                >
                  {subLabel}
                </Box>
              )}
            </Box>
          }
        />
        {endComponent ? (
          <div className="flex items-center" {...endComponentProps}>{endComponent}</div>
        ) : null}
      </Box>
      <div className="text-sm" {...restProps}>
        {children}
      </div>
    </Card>
  );
};
