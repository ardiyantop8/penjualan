import { Card, CardHeader } from "@mui/material";

export const CardWithBlueHeader = ({ children, icon, label, sx, ...restProps }) => {
  return (
    <Card
      variant='outlined'
      sx={{ 
        borderRadius: "20px",
        overflow: "visible", 
        ...sx 
      }}
    >
      <CardHeader 
        sx={{ 
          background:"#084F8C", 
          color: "#FFFFFF", 
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px", }}  
        avatar={icon}
        title={label}
        titleTypographyProps={{variant:'h6' }}
      />
      <div
          className='text-sm'
          {...restProps}
      >
          {children}
      </div>
    </Card>
  );
};