import { Box, Card } from "@mui/material";
export const CardWithHeaderSpaceBetween = ({
  children,
  icon,
  label,
  sx,
  bgColorHeader,
  endComponent,
  textColor,
  colorHeader,
  ...restProps
}) => {
  return (
    <Card
      sx={{
        borderRadius: "10px",
        px: 1,
        pb: 4,
        overflow: "visible",
        boxShadow: "none",
        ...sx,
      }}
    >
      <Box
        sx={{
          background: bgColorHeader || "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingY: "24px",
          paddingX: 2,
          borderRadius: "10px 10px 0 0",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1, color: colorHeader || "black" }}>
          {icon}
          <Box
            component="span"
            sx={{
              fontSize: "20px",
              fontWeight: 600,
              color: textColor || "#000000",
            }}
          >
            {label}
          </Box>
        </Box>

        {endComponent && (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {endComponent}
          </Box>
        )}
      </Box>

      <Box className="text-sm" {...restProps}>
        {children}
      </Box>
    </Card>
  );
};