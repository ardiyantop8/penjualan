import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { FormHelperText } from "@mui/material";
import { useController } from "react-hook-form";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";

export default function RadioDefault({
  name = "",
  control = null,
  defaultValue,
  label,
  options,
  className,
  titleClassName,
  fieldClassName,
  ...restProps
}) {
  const { field, formState } = useController({ control, name, defaultValue });

  if (!control) {
    return <Radio id="outlined-basic" variant="outlined" {...restProps} />;
  }

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
                    control={<Radio />}
                    label={item.label}
                  />
                ))
            : "You must provide options props"}
        </RadioGroup>
        <FormHelperText sx={{ fontSize: "16px", marginLeft: "0" }}>{formState.errors?.[name]?.message}</FormHelperText>
      </FormControl>
    </div>
  );
}
