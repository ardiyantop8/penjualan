import { TextLabel } from "@/components/atoms/typographies/label";
import { InputAdornment, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { IconInfo } from "@/components/atoms/icons/info";
import { twMerge } from "tailwind-merge";
import { NumericFormat } from "react-number-format";

export const TextFieldDefaultCurrency = ({
  name = "",
  control = null,
  defaultValue,
  className,
  titleClassName,
  maxLength,
  isDisabled,
  inputTextAlign,
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });

  if (!control) {
    return (
      <NumericFormat
      customInput={TextField}
      {...props}
      />
    )
  }

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}

      <NumericFormat
        id="outlined-basic"
        variant="outlined"
        error={!!formState.errors?.[name]}
        helperText={formState.errors?.[name]?.message}
        FormHelperTextProps={{
          style: {
            fontSize: "16px",
            marginLeft: 0,
          },
        }}
        size="small"
        autoComplete="off"
        className={"w-full " + className}
        disabled={isDisabled}
        inputProps={{
          maxLength: maxLength,
          style: { textAlign: inputTextAlign ?? 'left'}
        }}
        InputProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
          },
          endAdornment: !!formState.errors?.[name] && (
            <InputAdornment position="end" sx={{ paddingTop: "5px" }}>
              <span className="text-white">
                <IconInfo color="#E84040" isSmall />
              </span>
            </InputAdornment>
          ),
        }}
        name={field.name}
        value={field.value}
        onValueChange={(v) => {
          field.onChange(v.value);
          if (props.onChangeCustom) props.onChangeCustom();
        }}
        customInput={TextField}
        type="text"
        inputMode="numeric"
        {...props}
      />
    </div>
  );
};
