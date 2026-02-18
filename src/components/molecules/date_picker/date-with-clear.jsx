import { useState } from "react";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useController } from "react-hook-form";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";
import { IconCalendar } from "@/components/atoms/icons/calendar";
import { errorState } from "@/utils/json";

import CloseIcon from "@mui/icons-material/Close";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";

export default function ResponsiveDatePickerWithClear({
  name = "",
  control = null,
  defaultValue = null,
  className,
  titleClassName,
  placeholder,
  maxDate,
  minDate,
  isDisabled = false,
  subtitleClassName,
  ...props
}) {
  const { field, formState } = useController({ control, name, defaultValue });
  const [open, setOpen] = useState(false);

  const onKeyDown = (e) => {
    // Hapus value dengan Backspace/Delete, tapi cegah input manual
    if (e.keyCode === 8 || e.keyCode === 46) {
      field.onChange(null);
      e.preventDefault();
    } else if (e.keyCode !== 9) {
      e.preventDefault();
    }
  };

  const errorObject = errorState(name, formState.errors);
  const errorMessage = errorObject?.message?.toString();

  return (
    <div
      className={className}
      style={
        isDisabled
          ? {
              pointerEvents: "none", // ✅ Matikan semua interaksi
              opacity: 0.7, // ✅ Efek visual disable
            }
          : {}
      }
    >
      <div className="flex px-2">
        {props.title ? (
          <TextLabel className={twMerge("", titleClassName)}>
            {props.title}
          </TextLabel>
        ) : null}
        {props.subtitle ? (
          <TextLabel className={twMerge("", subtitleClassName)}>
            {props.subtitle}
          </TextLabel>
        ) : null}
      </div>

      <DatePicker
        open={open}
        onOpen={() => {
          if (!isDisabled) setOpen(true); // ✅ Cegah open saat disable
        }}
        onClose={() => setOpen(false)}
        className={className}
        disabled={isDisabled}
        components={{
          OpenPickerIcon: () => <IconCalendar color="#00529C" />,
        }}
        disableOpenPicker={isDisabled}
        value={field.value ?? null}
        maxDate={maxDate ?? null}
        minDate={minDate ?? null}
        inputFormat="DD/MM/YYYY"
        onChange={(newValue) => {
          field.onChange(newValue);
          if (props.onChange) props.onChange(name, newValue);
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            size="small"
            fullWidth
            onClick={() => {
              if (!isDisabled) setOpen(true); // ✅ Cegah klik saat disable
            }}
            onKeyDown={onKeyDown}
            helperText={errorMessage}
            error={!!errorMessage}
            disabled={isDisabled}
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
                backgroundColor: isDisabled ? "#EDEDED" : "inherit",
                cursor: isDisabled ? "not-allowed" : "pointer",
              },
            }}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {/* ✅ Tombol clear hanya muncul jika aktif & ada value */}
                  {!isDisabled && field.value && (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => field.onChange(null)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    </InputAdornment>
                  )}
                  {/* ✅ Icon kalender dari MUI */}
                  {!isDisabled && params.InputProps?.endAdornment}
                </>
              ),
              style: {
                borderRadius: "10px",
                backgroundColor: isDisabled ? "#EDEDED" : "inherit",
              },
            }}
          />
        )}
        {...props}
        {...field}
      />
    </div>
  );
}