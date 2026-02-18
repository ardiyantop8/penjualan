import { useState } from "react";
import dayjs from "dayjs";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useController } from "react-hook-form";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";
import { IconCalendar } from "@/components/atoms/icons/calendar";
import { errorState } from "@/utils/json";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function ResponsiveDatePicker({
  name = "",
  control = null,
  defaultValue,
  className,
  titleClassName,
  placeholder,
  maxDate,
  minDate,
  isDisabled,
  clearable = false,
  ...props
}) {
  const { field, formState } = useController({ control, name, defaultValue });
  const [open, setOpen] = useState(false);

  const onKeyDown = (e) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      field.onChange(null);
      e.preventDefault();
    } else if (e.keyCode !== 9) {
      e.preventDefault();
    }
  };

  const errorObject = errorState(name, formState.errors);
  const errorMessage = errorObject?.message?.toString();

  const handleClear = (e) => {
    e.stopPropagation();
    field.onChange(null);
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <DatePicker
        placeholder={props.placeholder}
        open={open}
        onOpen={() => !isDisabled && setOpen(true)}
        onClose={() => setOpen(false)}
        className={className}
        disabled={isDisabled}
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
            helperText={errorMessage}
            error={!!errorMessage}
            FormHelperTextProps={{
              style: {
                fontSize: "16px",
                marginLeft: 0,
              },
            }}
            inputProps={{
              ...params.inputProps,
              placeholder,
              style: {
                borderRadius: "10px",
                backgroundColor: isDisabled ? "#EDEDED" : "inherit",
              },
            }}
            disabled={isDisabled}
            InputProps={{
              ...params.InputProps,
              endAdornment: !isDisabled ? (
                <>
                  {/* ✅ muncul kalau ada nilai & clearable */}
                  {clearable && field.value ? (
                    <IconButton size="small" onClick={handleClear} tabIndex={-1}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  ) : null}
                  {params.InputProps?.endAdornment}
                </>
              ) : null,
              style: {
                borderRadius: "10px",
              },
            }}
          />
        )}
        value={field.value ? dayjs(field.value) : null}
        maxDate={maxDate || null}
        minDate={minDate || null}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          field.onChange(newValue ? dayjs(newValue) : null);
        }}
        size="small"
        {...props}
      />
    </div>
  );
}
