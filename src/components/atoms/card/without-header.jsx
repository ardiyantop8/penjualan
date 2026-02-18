import { Card, Box } from "@mui/material";

export const CardWithoutHeader = ({ sx, children, bgColor = "#eaf3fa", ...restProps }) => {
    return (
        <Card
            sx={{
                borderRadius: "10px",
                overflow: "visible",
                backgroundColor: bgColor, 
                display: "flex",
                flexDirection: "column",
                height: "100%",
                justifyContent: "space-between",
                boxShadow: "none", // Menghilangkan box shadow
                ...sx
            }}
        >
            <Box
                sx={{
                    borderRadius: "10px",
                    flex: 1, 
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "start",
                    paddingY: "20px",
                    boxSizing: "border-box",
                }}
            >
                <div className="text-sm w-full" {...restProps}>
                    {children}
                </div>
            </Box>
        </Card>
    );
};