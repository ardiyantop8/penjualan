import { TextLabel } from "@/components/atoms/typographies/label";
import { InputAdornment, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

export function TextFieldSearch({
  placeholder = "Search",
  className,
  InputProps,
  inputRef, // to catch the input ref from parent component,
  isDisabled,
  maxLength,
  ...props
}) {
  return (
    <>
      {props.title ? <TextLabel>{props.title}</TextLabel> : null}
      <TextField
        size="small"
        variant="outlined"
        placeholder={placeholder}
        inputRef={inputRef}
        disabled={isDisabled}
        className={className}
        InputProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
          },
          startAdornment: props?.iconPosition === "start" && (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: props?.iconPosition === "end" && (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
          ...InputProps,
        }}
        inputProps={{
          maxLength,
          ...props.inputProps
        }}
        {...props}
      />
    </>
  );
}
