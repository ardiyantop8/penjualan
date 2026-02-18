import { CheckboxBorder } from "@/components/atoms/icons/checkbox-border";
import { CheckboxChecked } from "@/components/atoms/icons/checkbox-checked";
import { Checkbox } from "@mui/material";

export const CheckboxDefault = ({
  checked = false,
  onChange,
  disabled = false,
  ...restProps
}) => {
  const handleChange = () => {
    onChange && onChange(!checked);
  };

  return (
    <Checkbox
      checked={checked}
      onChange={handleChange}
      icon={<CheckboxBorder />}
      checkedIcon={<CheckboxChecked disabled={disabled} />}
      {...restProps}
    />
  );
};
