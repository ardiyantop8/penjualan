import { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextLabel } from "@/components/atoms/typographies/label";
import { useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { IconCalendar } from "@/components/atoms/icons/calendar";

export default function ResponsiveDateTimePicker({
  name = "",
  control = null,
  defaultValue,
  className,
  titleClassName,
  placeholder,
  isDisabled,
  ...props
}) {
  const { field, formState } = useController({ control, name, defaultValue });
  const [open, setOpen] = useState(false);
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
      <DateTimePicker
        placeholder={props.placeholder}
        open={open}
        onOpen={() => !isDisabled && setOpen(true)}
        onClose={() => setOpen(false)}
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
        value={value}
        inputFormat="DD/MM/YYYY HH:mm"
        onChange={(newValue) => {
          setValue(newValue);
        }}
        size="small"
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
}
