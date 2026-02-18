import { LoadingButton } from "@mui/lab"

export const ButtonLoading = ({ children, loading, sx, ...restProps }) => {
  return (
    <LoadingButton
      sx={{
        borderRadius: "11px",
        ...sx,
      }}
      variant="contained"
      className="text-white w-full cursor-pointer"
      classes={{ loadingIndicator: "text-white" }}
      loading={loading}
      {...restProps}
    >
      {children}
    </LoadingButton>
  )
}
