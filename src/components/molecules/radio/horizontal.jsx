import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { useController } from "react-hook-form";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";
import { errorState } from "@/utils/json";
import { FormHelperText } from "@mui/material";

export default function RadioHorizontal({
  name = "",
  control = null,
  defaultValue,
  label,
  options,
  className,
  titleClassName,
  fieldClassName,
  isDisabled,
  radioColor,
  ...restProps
}) {
  const { field, formState } = useController({ control, name, defaultValue });

  if (!control) {
    return <Radio id="outlined-basic" variant="outlined" color="success" {...restProps} />;
  }

  const errorObject = errorState(name, formState.errors);
  const errorMessage = errorObject?.message?.toString();
  
  return (
    <div className={className}>
      <FormControl error={!!formState.errors?.[name]}>
        {label ? (
          <TextLabel className={twMerge("", titleClassName)}>{label}</TextLabel>
        ) : null}
        <RadioGroup
          aria-labelledby="controlled-radio-buttons-group"
          name="controlled-radio-buttons-group"
          value={field.value}
          onChange={field.onChange}
          className={fieldClassName}
          row
          {...restProps}
        >
          {options
            ? options
                .map((item, index) => ({
                  ...item,
                  key: `radio-item-${index}`,
                }))
                .map((item) => (
                  <FormControlLabel
                    key={item.key}
                    value={item.value}
                    disabled={isDisabled ?? item.isDisabled}
                    control={
                      <Radio
                        sx={{
                          color: radioColor || "",
                          "&.Mui-checked": {
                            color: radioColor || "#00529C",
                          },
                        }}
                      />
                    }
                    label={item.label}
                    {...item}
                  />
                ))
            : "You must provide options props"}
        </RadioGroup>
        {errorMessage && 
          <FormHelperText sx={{ fontSize: "16px", marginLeft: "0", color:"#d32f2f" }}>
            {errorMessage}
          </FormHelperText>
        }
      </FormControl>
    </div>
  );
}
