import { TextLabel } from "@/components/atoms/typographies/label";
import { Box, TextField } from "@mui/material";
import { IconButton } from "@mui/material";

import { useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const TextFieldFilledIcon = ({
  name = "",
  control = null,
  className,
  titleClassName,
  defaultValue,
  maxLength,
  isNumericOnly,
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });

  const isInputFilled = field.value !== "";

  if (!control) {
    return <TextField id="outlined-basic" variant="outlined" {...props} />;
  }

  const handleKeyDown = (e) => {
    if (
      (e.ctrlKey || e.metaKey) &&
      ["a", "c", "v", "x", "z", "y"].includes(e.key.toLowerCase())
    ) {
      return;
    }
    const allowedKeys = [
      "Tab",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Home",
      "End",
      "Escape",
      "Enter",
    ];
    if (allowedKeys.includes(e.key)) {
      return;
    }
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("text-sm", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <Box className="grid relative">
        <TextField
          id="username-input"
          variant="outlined"
          error={!!formState.errors?.[name]}
          helperText={formState.errors?.[name]?.message}
          size="small"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          inputProps={{
            maxLength,
          }}
          InputProps={{
            style: {
              borderRadius: "10px",
            },
          }}
          onKeyDown={isNumericOnly ? handleKeyDown : null}
          {...props}
          {...field}
        />
        {isInputFilled ? (
          <Box component="span">
            <IconButton
              aria-label="toggle on check"
              edge="end"
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bottom: 0,
                margin: "auto",
              }}
              disabled
            >
              {props.icon}
            </IconButton>
          </Box>
        ) : null}
      </Box>
    </div>
  );
};
