import { CheckboxBorder } from "@/components/atoms/icons/checkbox-border";
import { CheckboxChecked } from "@/components/atoms/icons/checkbox-checked";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

export const CheckboxLabelled = ({
  checked = false,
  labelPlacement = "end",
  options,
  onChange,
  isHorizontal = false,
  sx,
  ...restProps
}) => {
  const handleChange = (option) => {
    onChange && onChange(option.value, !checked.includes(option.value));
  };

  return (
    <FormGroup row={isHorizontal} sx={{ gap: isHorizontal ? 2 : 0, ...sx }}>
      {options
        ? options.map((option, index) => (
            <FormControlLabel
              labelPlacement={labelPlacement}
              key={index}
              control={
                <Checkbox
                  defaultChecked={
                    option.defaultChecked || restProps.defaultChecked
                  }
                  checked={checked.includes(option.value)}
                  onChange={() => handleChange(option)}
                  icon={<CheckboxBorder />}
                  checkedIcon={<CheckboxChecked disabled={restProps.disabled} />}
                  sx={{
                    ":hover": {
                      backgroundColor: "#C0DBF1",
                    },
                    ...sx,
                  }}
                />
              }
              label={option.label}
              required={restProps.required}
              disabled={option.disabled ?? restProps.disabled}
              {...restProps}
            />
          ))
        : "Please provide options prop."}
    </FormGroup>
  );
};
