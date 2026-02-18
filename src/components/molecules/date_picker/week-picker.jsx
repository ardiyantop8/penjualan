import { useController } from "react-hook-form";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  OutlinedInput,
  IconButton
} from "@mui/material";
import { twMerge } from "tailwind-merge";
import { TextLabel } from "@/components/atoms/typographies/label";
import CloseIcon from "@mui/icons-material/Close";

export const WeekPicker = ({
  name = "",
  control = null,
  className,
  titleClassName,
  title,
  totalWeeks = 4,
  isDisabled = false,
  placeholder = "Pilih Minggu",
  defaultValue = ""
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    name,
    control,
    defaultValue,
  });

  const handleClear = (e) => {
    e.stopPropagation(); // biar klik ❌ nggak buka dropdown
    field.onChange("");
  };

  return (
    <div className={className}>
      {title ? (
        <TextLabel className={twMerge("", titleClassName)}>{title}</TextLabel>
      ) : null}
      <FormControl fullWidth size="small" disabled={isDisabled} error={!!errors?.[name]}>
        <InputLabel>{placeholder}</InputLabel>
        <Select
          {...field}
          input={
            <OutlinedInput
              label={placeholder}
              endAdornment={
                field.value ? (
                  <IconButton
                    size="small"
                    onClick={handleClear}
                    edge="end"
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                ) : null
              }
              sx={{
                backgroundColor: isDisabled ? '#EDEDED' : 'inherit',
                borderRadius: "10px",
                paddingRight: field.value ? "36px" : undefined // spasi untuk ikon
              }}
            />
          }
        >
          {Array.from({ length: totalWeeks }, (_, i) => (
            <MenuItem key={i + 1} value={i + 1}>
              Minggu {i + 1}
            </MenuItem>
          ))}
        </Select>
        {errors?.[name] && (
          <FormHelperText>{errors[name].message}</FormHelperText>
        )}
      </FormControl>
    </div>
  );
};