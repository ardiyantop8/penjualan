import { TextFieldDefault } from "@/components/molecules/text_fields/default";
import { ButtonDefault } from "@/components/atoms/buttons/default";
import { twMerge } from "tailwind-merge";

export const TextFieldWithButton = ({
  name = "",
  control = null,
  defaultValue,
  className,
  titleClassName,
  maxLength,
  showLength,
  isNumericOnly,
  isAlphaNumericOnly,
  isAlphaOnly,
  allowedSpecialCharacters = "",
  dontAllowedSpecialCharacters = "",
  isAlphaNumericWithUnderscore,
  isDisabled,
  isCantPaste,
  buttonText = "Submit",
  buttonModel = "fill",
  buttonColor = "#ED6E12",
  onButtonClick,
  gap = "10px",
  buttonClassName,
  buttonIcon,
  ...props
}) => {
  return (
    <div className={twMerge("flex items-start", className)} style={{ gap }}>
      <div className="flex-1">
        <TextFieldDefault
          name={name}
          control={control}
          defaultValue={defaultValue}
          className="w-full"
          titleClassName={titleClassName}
          maxLength={maxLength}
          showLength={showLength}
          isNumericOnly={isNumericOnly}
          isAlphaNumericOnly={isAlphaNumericOnly}
          isAlphaOnly={isAlphaOnly}
          allowedSpecialCharacters={allowedSpecialCharacters}
          dontAllowedSpecialCharacters={dontAllowedSpecialCharacters}
          isAlphaNumericWithUnderscore={isAlphaNumericWithUnderscore}
          isDisabled={isDisabled}
          isCantPaste={isCantPaste}
          {...props}
        />
      </div>

      <ButtonDefault
        onClick={onButtonClick}
        model={buttonModel}
        color={buttonColor}
        disabled={props.buttonDisabled}
        className={twMerge("ml-2 h-10", buttonClassName)}
        sx={{ minWidth: "10%", width: "auto", marginTop: "40px", paddingX: "24px" }}
      >
        {buttonIcon && <span className="flex items-center mr-2">{buttonIcon}</span>}
        {buttonText}
      </ButtonDefault>
    </div>
  );
};
