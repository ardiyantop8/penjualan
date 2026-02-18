import { TextLabel } from "@/components/atoms/typographies/label";
import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AsyncSelect from "react-select/async";
import { twMerge } from "tailwind-merge";

export default function SelectAsyncSearch({
  name = "",
  control = null,
  loadOptions = () => {},
  defaultValue,
  className,
  isClearable,
  isDisabled,
  titleClassName,
  loadingMessage,
  minCharacter,
  ...props
}) {
  const { field, formState } = useController({ control, name, defaultValue });

  const customStyles = {
    control: (base) => ({
      ...base,
      minHeight: 40,
      border: isDisabled ? "1px solid #B0B0B0" : 
            (name in formState.errors ? "1px solid #d32f2f" : null),
      borderRadius: "10px",
      marginBottom: "4px",
      backgroundColor: isDisabled ? '#EDEDED' : '#FFFFFF',
      "&:hover": {
        border: isDisabled ? "1px solid #B0B0B0" : 
              (name in formState.errors ? "1px solid #d32f2f" : null)
      }
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: `${name in formState.errors ? "#D32F2F" : isDisabled ? '#9e9e9e'  : "#004B8F"}`,
    }),
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <AsyncSelect
        loadOptions={loadOptions}
        defaultValue={defaultValue}
        styles={customStyles}
        isClearable={isClearable}
        isDisabled={isDisabled}
        components={{
          IndicatorSeparator: () => null,
        }}
        placeholder={props.placeholder}
        loadingMessage={minCharacter ? () => 'Please enter ' + minCharacter + ' or more characters' : loadingMessage}
        {...props}
        {...field}
        onChange={(option, actionMeta) => {
          field.onChange(option); // update react-hook-form
          if (typeof props.onChange === "function") {
            props.onChange(option, actionMeta); // call parent handler
          }
        }}
      />

      <ErrorMessage
        errors={formState.errors}
        name={name}
        render={({ message }) => (
          <span
            style={{
              color: "#d32f2f",
              fontSize: "16px",
            }}
          >
            {message}
          </span>
        )}
      />
      {props.helperText ? (
        <p className="pt-1 text-[#999999] text-xs">{props.helperText}</p>
      ) : null}
    </div>
  );
}
