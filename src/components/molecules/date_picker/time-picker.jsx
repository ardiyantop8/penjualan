import { useState } from "react";
import { useController } from "react-hook-form";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { TimePicker as Time } from "@mui/x-date-pickers";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";

export const TimePicker = ({
  name = "",
  control = null,
  className,
  titleClassName,
  defaultValue,
  placeholder,
  isDisabled,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const { field, formState } = useController({ control, name, defaultValue });
  const [value, setValue] = useState(dayjs());

  const onKeyDown = (e) => {
    if (e.keyCode != 9) {
      e.preventDefault();
    }
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <Time
        ampm={true}
        orientation="portrait"
        open={open}
        onOpen={() => !isDisabled && setOpen(true)}
        onClose={() => setOpen(false)}
        openTo="hours"
        views={["hours", "minutes", "seconds"]}
        inputFormat="HH:mm:ss"
        mask="__:__:__"
        value={value}
        disabled= {isDisabled}
        disableOpenPicker={isDisabled}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            fullWidth
            onClick={() => setOpen(true)}
            onKeyDown={onKeyDown}
            helperText={formState.errors?.[name]?.message}
            error={!!formState.errors?.[name]}
            FormHelperTextProps={{
              style: {
                fontSize: "16px",
                marginLeft: 0,
              },
            }}
            inputProps={{
              ...params.inputProps,
              disableMaskedInput: true.toString(),
              placeholder: placeholder,
              style: {
                borderRadius: "10px",
                backgroundColor: isDisabled ? "#EDEDED" : 'inherit',
              },
            }}
            disabled={isDisabled}
          />
        )}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        InputProps={{
          style: {
            borderRadius: "10px",
          },
        }}
        {...props}
        {...field}
      />
    </div>
  );
};
