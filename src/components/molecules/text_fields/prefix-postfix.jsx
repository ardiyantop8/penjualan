import { IconInfo } from "@/components/atoms/icons/info";
import { TextLabel } from "@/components/atoms/typographies/label";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const TextFieldPrefixPostfix = ({
  name = "",
  control = null,
  className,
  titleClassName,
  defaultValue,
  isBgColor,
  prefixPostFix,
  isDisabled,
  maxLength,
  isNumericOnly,
  AdditionalButtonComponent,
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });

  if (!control) {
    return <TextField id="outlined-basic" variant="outlined" {...props} />;
  }
  

  const handleKeyDown = (e) => {
    const allowedKeys = ["Tab", "Backspace", "Delete", "ArrowLeft", "ArrowRight"];
    const isPaste = (e.ctrlKey || e.metaKey) && e.key === "v";
    if (props.noSpaceAllowed && e.code === "Space"){
      e.preventDefault();
      return
    }
    if (isNumericOnly && !isPaste) {
      const allowedPattern = /^[0-9]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData('Text');
    let sanitizedData = pastedData;

    if (props.noSpaceAllowed) {
      sanitizedData = sanitizedData.replace(/\s+/g, '');
    }

    if (isNumericOnly) {
      e.preventDefault();
      const allowedPattern = /[0-9]+/g;
      const filteredData = sanitizedData.match(allowedPattern)?.join('') || '';
      const { value } = e.target;
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newValue = value.slice(0, start) + filteredData + value.slice(end);
      const truncatedValue = newValue.slice(0, maxLength);
      field.onChange(truncatedValue);
      e.target.setSelectionRange(start + truncatedValue.length, start + truncatedValue.length);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    if (props.noSpaceAllowed) {
      value = value.replace(/\s+/g, '');
    }

    if (isNumericOnly) {
      const allowedPattern = /[0-9]+/g;
      const filteredValue = value.match(allowedPattern)?.join('') || '';
      const truncatedValue = filteredValue.slice(0, maxLength);
      field.onChange(truncatedValue);
    } else {
      const truncatedValue = value.slice(0, maxLength);
      field.onChange(truncatedValue);
    }
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <Box className="grid relative mt-0">
        <TextField
          id="username-input"
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
          sx={{
            "& .MuiOutlinedInput-root": {
              paddingLeft: 0,
              paddingRight: 0,
            },
          }}
          onKeyDown={props.noSpaceAllowed || isNumericOnly ? handleKeyDown : undefined}
          onPaste={props.noSpaceAllowed || isNumericOnly ? handlePaste : undefined}
          onChange={handleChange}
          inputProps={{
            maxLength: maxLength,
          }}
          disabled={isDisabled}
          InputProps={{
            style: {
              borderRadius: "10px",
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
                    isBgColor !="default" || formState.errors?.[name]
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
                    padding: AdditionalButtonComponent ? 0 : "20px 14px",
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
                  {AdditionalButtonComponent}
                </InputAdornment>
              </>
            ),
          }}
          {...props}
          {...field}
        />
      </Box>
    </div>
  );
};
