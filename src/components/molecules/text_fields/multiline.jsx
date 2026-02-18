import { IconInfo } from "@/components/atoms/icons/info";
import { TextLabel } from "@/components/atoms/typographies/label";
import { InputAdornment, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const TextFieldMultiline = ({
  name = "",
  control = null,
  defaultValue,
  helperText,
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      field.onChange(field.value ? field.value + "   • " : "   • ");
    }
  };

  if (!control) {
    return (
      <TextField
        id={name}
        variant="outlined"
        multiline
        minRows={4}
        helperText={helperText}
        fullWidth
        disabled={props.isDisabled}
        InputProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: props.isDisabled ? "#EDEDED" : "#FFFFFF",
          },
          endAdornment: !!formState.errors?.[name] && (
            <InputAdornment position="end" sx={{ paddingTop: "5px" }}>
              <span className="text-white">
                <IconInfo color="#E84040" isSmall />
              </span>
            </InputAdornment>
          ),
        }}
        {...props}
      />
    );
  }

  return (
    <div className={props.className}>
      {props.title ? (
        <TextLabel className={twMerge("", props.titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <TextField
        id={name}
        variant="outlined"
        multiline
        minRows={4}
        onKeyDown={handleKeyDown}
        error={!!formState.errors?.[name]}
        disabled={props.isDisabled}
        helperText={formState.errors?.[name]?.message ?? helperText}
        FormHelperTextProps={{
          style: {
            fontSize: formState.errors?.[name]?.message
              ? "16px"
              : "0.6964285714285714rem",
            marginLeft: formState.errors?.[name]?.message ? 0 : "14px",
          },
        }}
        fullWidth
        InputProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: props.isDisabled ? "#EDEDED" : "#FFFFFF",
          },
          endAdornment: !!formState.errors?.[name] && (
            <InputAdornment position="end" sx={{ paddingTop: "5px" }}>
              <span className="text-white">
                <IconInfo color="#E84040" isSmall />
              </span>
            </InputAdornment>
          ),
        }}
        {...props}
        {...field}
      />
    </div>
  );
};
