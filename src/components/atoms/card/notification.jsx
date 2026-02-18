import { Card } from "@mui/material";

export const CardNotification = ({ children, sx, ...restProps }) => {
    return (
        <Card
            variant='outlined'
            sx={{ borderRadius: "10px", backgroundColor: "#EAF3FA", ...sx }}
            {...restProps}
        >
            <div
                className='text-sm'
            >
                {children}  
            </div>

        </Card>
    );
}