import { IconInfo } from "@/components/atoms/icons/info";
import { TextLabel } from "@/components/atoms/typographies/label";
import { Box, Button, Input, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

import { useController } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export const TextFieldPrefixPostfixUpload = ({
  name = "",
  control = null,
  className,
  titleClassName,
  fileName = null,
  defaultValue,
  isBgColor,
  prefixPostFix,
  iconPrefixPostFix,
  isDisabled,
  accept = null,
  uploadFile = null,
  maxSize = 5,
  index = null,
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });
  const [fileSizeError, setFileSizeError] = useState(false);
  const [unsupportFile, setUnsupportFile] = useState(false);
  const inputId = index == null ? name : name + "_" + (index?.index ?? "");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const extensionsString = accept;
      const extensionsArray = extensionsString
        .split(",")
        .map((ext) => ext.trim());
      const acceptedExtensions = extensionsArray;
      const extension = file.name.split(".").pop().toLowerCase();
      if (!acceptedExtensions.includes(`.${extension}`)) {
        field.onChange("");
        setUnsupportFile(true);
        return;
      }
      if (file.size >= maxSize * 1024 * 1024) {
        field.onChange("");
        setFileSizeError(true);
        return;
      }
      setFileSizeError(false);
      setUnsupportFile(false);
      field.onChange(file.name);
      if (uploadFile) {
        const fileRename = fileName ? fileName : file.name.split('.').slice(0, -1).join('.');
        const newFileName = index !== null ? `${index?.index}_${fileRename}.${extension}` : `${fileRename}.${extension}`;
        uploadFile(newFileName, file);
      }
    } else {
      field.onChange("");
      uploadFile("", null);
    }
  };

  if (!control) {
    return (
      <TextField
        id="outlined-basic"
        variant="outlined"
        type="file"
        {...props}
      />
    );
  }

  const handleButtonClick = () => {
    document.getElementById(inputId).click();
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
          type="text"
          value={
            fileName && field.value?.includes(".")
              ? `${fileName}.${field.value.split(".").pop()}`
              : field.value
          }
          onChange={field.onChange}
          onBlur={field.onBlur}
          onFocus={field.onFocus}
          error={!!formState.errors?.[name]}
          helperText={
            fileSizeError
              ? "Ukuran file melebihi " + maxSize + " MB"
              : unsupportFile
              ? "Ekstensi file tidak didukung"
              : "Format " + accept + " ukuran Maks. " + maxSize + " MB"
          }
          FormHelperTextProps={{
            style: {
              fontSize: "16px",
              marginLeft: 0,
              color: fileSizeError || unsupportFile ? "#E84040" : "",
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
          InputProps={{
            readOnly: true,
            style: {
              borderRadius: "10px",
              backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
            },
            startAdornment: props.position === "start" && (
              <InputAdornment
                position="start"
                sx={{
                  marginRight: "-35px",
                }}
              >
                <Button
                  startIcon={iconPrefixPostFix}
                  onClick={handleButtonClick}
                  variant="contained"
                  sx={{
                    lineHeight: "normal",
                    borderRadius: "10px 0 0 10px",
                    backgroundColor:
                      formState.errors?.[name] || fileSizeError || unsupportFile
                        ? "#E84040"
                        : isBgColor == "blue"
                        ? "#084F8C"
                        : isBgColor == "default"
                        ? "#E0E0E0"
                        : "none",
                    color:
                      isBgColor !== "default" ||
                      formState.errors?.[name] ||
                      fileSizeError ||
                      unsupportFile
                        ? "white"
                        : "black",
                    padding: "9px 14px",
                    "&:hover": {
                      backgroundColor:
                        formState.errors?.[name] ||
                        fileSizeError ||
                        unsupportFile
                          ? "#991111"
                          : isBgColor == "blue"
                          ? "#0867C9"
                          : isBgColor == "default"
                          ? "#BEBEBE"
                          : "none",
                    },
                  }}
                >
                  {prefixPostFix}
                </Button>
                <span
                  className={`${
                    isBgColor != "default" || formState.errors?.[name]
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
                <InputAdornment position="end">
                  <Button
                    startIcon={iconPrefixPostFix}
                    onClick={handleButtonClick}
                    variant="contained"
                    sx={{
                      lineHeight: "normal",
                      borderRadius: "0 10px 10px 0",
                      backgroundColor: formState.errors?.[name]
                        ? "#E84040"
                        : isBgColor == "blue"
                        ? "#084F8C"
                        : isBgColor == "default"
                        ? "#E0E0E0"
                        : "none",
                      color:
                        isBgColor !== "default" || formState.errors?.[name]
                          ? "white"
                          : "black",
                      padding: "9px 14px",
                      "&:hover": {
                        backgroundColor: formState.errors?.[name]
                          ? "#991111"
                          : isBgColor == "blue"
                          ? "#0867C9"
                          : isBgColor == "default"
                          ? "#BEBEBE"
                          : "none",
                      },
                    }}
                  >
                    {prefixPostFix}
                  </Button>
                </InputAdornment>
              </>
            ),
          }}
          {...props}
        />
        <Input
          id={inputId}
          type="file"
          inputProps={{ accept: accept }}
          style={{ display: "none" }}
          onChange={handleFileChange}
          disabled={isDisabled}
        />
      </Box>
    </div>
  );
};
