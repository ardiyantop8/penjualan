import { IconButton } from '@mui/material'

export const IconButtons = ({ children, sx, ...restProps }) => {
  return (
    <IconButton
      sx={{
        borderRadius: '10px',
        fontWeight: '800',
        ...sx

      }}
      className='w-full cursor-pointer'
      {...restProps}
    >
      {children}
    </IconButton>
  )
}
