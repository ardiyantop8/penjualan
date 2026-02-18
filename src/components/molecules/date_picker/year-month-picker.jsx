import { useState } from "react";
import { useController } from "react-hook-form";
import dayjs from "dayjs";
import { TextField, Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";
import { IconCalendar } from "@/components/atoms/icons/calendar";
import { errorState } from "@/utils/json";
import "dayjs/locale/id";
dayjs.locale("id");

// * Custom ActionBar component for showing "Clear date" in the popover
const CustomActionBar = ({ onClear, clearable }) => {
  if (!clearable) return null;

  return (
    <Box
      onClick={onClear}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderTop: "1px solid #e0e0e0",
        py: 1.5,
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
        "&:active": {
          backgroundColor: "rgba(0, 0, 0, 0.08)",
        },
      }}
    >
      <span
        style={{
          color: "#1976d2",
          fontSize: "14px",
          fontWeight: 500,
        }}
      >
        Clear date
      </span>
    </Box>
  );
};

export const YearMonthPicker = ({
  name = "",
  control = null,
  className,
  titleClassName,
  defaultValue = null,
  placeholder = "Pilih Bulan & Tahun",
  isDisabled = false,
  minDate = dayjs("1970-01-01"),
  maxDate = dayjs(),
  displayFormat = "YYYY-MM", // Display format in the input field: "2025-12", "MMMM YYYY" → "Desember 2025", "MMM YYYY" → "Des 2025"
  outputFormat = "YYYY-MM", // Format output/value: "YYYY-MM" → "2025-12", "MM-YYYY" → "12-2025", "YYYYMM" → "202512", "YYYY/MM" → "2025/12"
  clearable = true, // Show the "Clear date" button in the popover
  showToolbar = false, // Hide the toolbar (mobile: month label and pencil icon)
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [currentView, setCurrentView] = useState("month"); // Track current view
  const { field, formState } = useController({ control, name, defaultValue });

  const onKeyDown = (e) => {
    if (e.keyCode !== 9) {
      e.preventDefault();
    }
  };

  const errorObject = errorState(name, formState.errors);
  const errorMessage = errorObject?.message?.toString();

  const displayValue = field.value ? dayjs(field.value, outputFormat) : null;

  const handleClear = () => {
    field.onChange(null);
    setOpen(false);
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <DatePicker
        open={open}
        onOpen={() => !isDisabled && setOpen(true)}
        onClose={() => setOpen(false)}
        views={["year", "month"]}
        openTo="month"
        inputFormat={displayFormat}
        value={displayValue}
        disabled={isDisabled}
        minDate={minDate ? dayjs(minDate) : undefined}
        maxDate={maxDate ? dayjs(maxDate) : undefined}
        components={{
          OpenPickerIcon: () => <IconCalendar color="#00529C" />,
          ActionBar: () => (
            <CustomActionBar onClear={handleClear} clearable={clearable} />
          ),
        }}
        // Track view changes (year/month)
        onViewChange={(view) => setCurrentView(view)}
        showToolbar={showToolbar}
        // Override style: if the value is empty, hide the selected style on the current month
        PopperProps={{
          sx: !displayValue
            ? {
                "& .Mui-selected": {
                  backgroundColor: "transparent !important",
                  color: "inherit !important",
                },
              }
            : {},
        }}
        // Hide pencil (edit) icon on mobile + hide selected style when no value
        DialogProps={{
          sx: {
            "& .MuiPickersToolbar-penIconButton": {
              display: "none",
            },
            // Hide selected style when no value (mobile)
            ...(!displayValue && {
              "& .Mui-selected": {
                backgroundColor: "transparent !important",
                color: "inherit !important",
              },
            }),
          },
        }}
        disableOpenPicker={isDisabled}
        disableMaskedInput
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
          />
        )}
        onChange={(newValue) => {
          if (newValue && dayjs(newValue).isValid()) {
            field.onChange(dayjs(newValue).format(outputFormat));
            // Only close when selecting month, not year
            if (currentView === "month") {
              setOpen(false);
            }
          } else {
            field.onChange(null);
          }
        }}
        InputProps={{
          style: {
            borderRadius: "10px",
          },
        }}
      />
    </div>
  );
};

export default YearMonthPicker;
