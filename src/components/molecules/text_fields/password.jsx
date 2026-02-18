import { TextLabel } from "@/components/atoms/typographies/label";
import { Box, TextField } from "@mui/material";
import { IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

import { useController } from "react-hook-form";
import { useCallback, useState } from "react";
import { CapsLockOn } from "@/components/atoms/icons/capslock-on";
import { twMerge } from "tailwind-merge";

export const TextFieldPassword = ({
  name = "",
  control = null,
  className,
  titleClassName,
  defaultValue,
  maxLength,
  isDisabled,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isCapsLock, setIsCapsLock] = useState(false);
  const { field, formState } = useController({ control, name, defaultValue });

  const isInputFilled = field.value !== "";
  const hasNoWhiteSpace = !field.value.includes(" ");

  const handleShowPassword = useCallback(
    (e) => {
      e.preventDefault();
      setShowPassword((prev) => !prev);
      document.getElementById(name)?.blur();
    },
    //eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleCapsLock = (event) => {
    if (event.getModifierState("CapsLock")) {
      setIsCapsLock(true);
    } else {
      setIsCapsLock(false);
    }
  };

  if (!control) {
    return <TextField id="outlined-basic" variant="outlined" {...props} />;
  }
  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("text-sm", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <Box className="grid relative">
        <TextField
          id={name}
          variant="outlined"
          error={!!formState.errors?.[name]}
          helperText={formState.errors?.[name]?.message}
          size="small"
          type={showPassword ? "text" : "password"}
          onKeyDown={handleCapsLock}
          inputProps={{ maxLength: maxLength }}
          disabled={isDisabled ?? false}
          InputProps={{
            style: {
              borderRadius: "10px",
              backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
            },
          }}
          {...props}
          {...field}
        />
        <Box component="span" className="inline-flex justify-end items-end">
          <IconButton
            aria-label="toggle caps lock visibility"
            edge="end"
            disabled
            style={{
              display: !isInputFilled || !hasNoWhiteSpace ? "none" : "block",
              position: "absolute",
              top: 0,
              right: 30,
              bottom: 0,
              margin: "auto",
            }}
          >
            {isCapsLock ? <CapsLockOn /> : null}
          </IconButton>
          <IconButton
            aria-label="toggle password visibility"
            onClick={handleShowPassword}
            onMouseDown={handleMouseDownPassword}
            edge="end"
            type="button"
            style={{
              display: !isInputFilled || !hasNoWhiteSpace ? "none" : "block",
              position: "absolute",
              top: 0,
              bottom: formState.errors[`${name}`] ? 18 : 0,
              right: 0,
              margin: "auto",
            }}
          >
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </Box>
      </Box>
    </div>
  );
};
