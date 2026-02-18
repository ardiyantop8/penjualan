import { IconInfo } from "@/components/atoms/icons/info";
import { TextLabel } from "@/components/atoms/typographies/label";
import { Box, InputAdornment, TextField } from "@mui/material";

import { useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import { NumericFormat } from "react-number-format";

export const TextFieldPrefixPostfixCurrency = ({
  name = "",
  control = null,
  className,
  titleClassName,
  defaultValue,
  isBgColor,
  prefixPostFix,
  isDisabled,
  maxLength,
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
      <Box className="grid relative mt-0">
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
              paddingLeft : "0px",
              paddingRight : "0px",
              backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
            },
            startAdornment: props.position === "start" && (
              <InputAdornment
                position="start"
                sx={{
                  padding: "20px 14px",
                  borderRadius: "10px 0 0 10px",
                  backgroundColor: formState.errors?.[name]
                    ? "#E84040"
                    : isBgColor == "blue"
                    ? "#084F8C"
                    : isBgColor == "default"
                    ? "#E0E0E0"
                    : isBgColor == "red"
                    ? "#E84040"
                    : "none",
                }}
              >
                <span
                  className={`${
                    isBgColor != "default"|| formState.errors?.[name]
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {prefixPostFix}
                </span>
              </InputAdornment>
            ),
            endAdornment: props.position === "end" && (
              <>
                {!!formState.errors?.[name] && (
                  <InputAdornment position="end" sx={{ paddingTop: "5px" }}>
                    <span>
                      <IconInfo color="#E84040" isSmall />
                    </span>
                  </InputAdornment>
                )}
                <InputAdornment
                  position="end"
                  sx={{
                    padding: "20px 14px",
                    borderRadius: "0 10px 10px 0",
                    backgroundColor: formState.errors?.[name]
                      ? "#E84040"
                      : isBgColor == "blue"
                      ? "#084F8C"
                      : isBgColor == "default"
                      ? "#E0E0E0"
                      : isBgColor == "red"
                      ? "#E84040"
                      : "none",
                  }}
                >
                  <span
                    className={`${
                      isBgColor !="default" || formState.errors?.[name]
                        ? "text-white"
                        : "text-black"
                    }`}
                  >
                    {prefixPostFix}
                  </span>
                </InputAdornment>
              </>
            ),
          }}
          name={field.name}
          value={field.value}
          onValueChange={(v) => field.onChange(v.value)}
          customInput={TextField}
          type="text"
          inputMode="numeric"
          {...props}
        />
      </Box>
    </div>
  );
};
