import { Card } from "@mui/material";

export const CardDefault = ({ children, sx, ...restProps }) => {
  return (
    <Card
      sx={{ 
        borderRadius: "20px", 
        overflow: "visible",
        boxShadow: "none", 
        ...sx }}
    >
      <div
          className='text-sm'
          {...restProps}
      >
          {children}
      </div>
    </Card>
  );
};
 