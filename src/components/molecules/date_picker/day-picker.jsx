import { useState } from "react";
import { useController } from "react-hook-form";
import dayjs from "dayjs";
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";
import { IconCalendar } from "@/components/atoms/icons/calendar";

export const DayPicker = ({
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
      <DatePicker
        orientation="portrait"
        open={open}
        onOpen={() => !isDisabled && setOpen(true)}
        onClose={() => setOpen(false)}
        views={["day"]}
        inputFormat="DD"
        value={value}
        disabled= {isDisabled}
        components={{
          OpenPickerIcon: () => <IconCalendar color="#00529C" />,
        }}
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
              placeholder,
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
