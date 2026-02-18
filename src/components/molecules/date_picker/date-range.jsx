import { useRef, useState } from "react";
import { Popover, TextField, InputAdornment } from "@mui/material";
import { DateRange } from "react-date-range";
import { IconCalendar } from "@/components/atoms/icons/calendar";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";

export default function DateRangePicker({
  title,
  titleClassName,
  placeholder,
  value = {},
  onChange,
  format = "",
  minDate,
  maxDate,
  editableDateInputs=false,
}) {
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const [hasSelected, setHasSelected] = useState(
    !!(value?.startDate && value?.endDate)
  );

  const startDate = value?.startDate
    ? dayjs(new Date(value.startDate)).format(format || "DD/MM/YYYY")
    : "";
  const endDate = value?.endDate
    ? dayjs(new Date(value.endDate)).format(format || "DD/MM/YYYY")
    : "";

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleDateChange = (item) => {
    setHasSelected(true);
    onChange(item.selection);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {title && (
        <TextLabel className={twMerge("", titleClassName)}>{title}</TextLabel>
      )}
      <TextField
        inputRef={inputRef}
        fullWidth
        size="small"
        placeholder={placeholder}
        value={
          value?.startDate && value?.endDate ? `${startDate} - ${endDate}` : ""
        }
        onClick={handleClick}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <InputAdornment position="end">
              <IconCalendar color="#1976d2" />
            </InputAdornment>
          ),
          style: {
            borderRadius: "10px",
            backgroundColor: "#fff",
          },
        }}
        inputProps={{
          style: {
            color: value?.startDate && value?.endDate ? "#000" : "#999",
          },
        }}
      />

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <DateRange
          editableDateInputs={editableDateInputs}
          onChange={handleDateChange}
          moveRangeOnFirstSelection={false}
          minDate={minDate}
          maxDate={maxDate}
          ranges={[
            hasSelected
              ? {
                  startDate: new Date(value.startDate),
                  endDate: new Date(value.endDate),
                  key: "selection",
                  color: "#1976d2",
                }
              : {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: "selection",
                  color: "#1976d2",
                },
          ]}
        />
      </Popover>
    </>
  );
}
