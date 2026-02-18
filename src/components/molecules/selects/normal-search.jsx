import Select from "react-select";
import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { TextLabel } from "@/components/atoms/typographies/label";
import { twMerge } from "tailwind-merge";

export default function SelectWithSearch({
  name = "",
  control = null,
  options = [],
  defaultValue,
  className,
  isClearable,
  isDisabled,
  titleClassName,
  subtitleClassName,
  messageNoOption = "Data tidak ada",
  ...props
}) {
  const { field, formState } = useController({ control, name, defaultValue });

  const customStyles = {
    control: (base) => ({
      ...base,
      height: 40,
      minHeight: 40,
      border: isDisabled ? "1px solid #B0B0B0" : 
            (name in formState.errors ? "1px solid #d32f2f" : null),
      borderRadius: "10px",
      marginBottom: "4px",
      backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
      "&:hover": {
        border: isDisabled ? "1px solid #B0B0B0" : 
          (name in formState.errors ? "1px solid #d32f2f" : null)
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: "#9e9e9e",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: `${
        name in formState.errors
          ? "#D32F2F"
          : isDisabled
          ? "#9e9e9e"
          : "#004B8F"
      }`,
    }),
    menu: (base) => ({
      ...base,
      zIndex: 1000,
    }),
    noOptionsMessage: (base) => ({ ...base, color: "black" }),
  };

  return (
    <div className={className}>
      <div className="flex">
        {props.title ? (
          <TextLabel className={twMerge("", titleClassName)}>
            {props.title}
          </TextLabel>
        ) : null}
        {props.subtitle ? (
          <TextLabel className={twMerge("", subtitleClassName)}>
            {props.subtitle}
          </TextLabel>
        ) : ( null )}
      </div>
      <Select
        isClearable={isClearable}
        options={options}
        placeholder={props.placeholder}
        styles={customStyles}
        components={{
          IndicatorSeparator: () => null,
        }}
        tabSelectsValue
        isDisabled={isDisabled}
        noOptionsMessage={() => messageNoOption}
        {...field}
        {...props}
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
    </div>
  );
}
