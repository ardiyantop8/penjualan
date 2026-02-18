import { TextLabel } from "@/components/atoms/typographies/label";
import { InputAdornment, TextField } from "@mui/material";
import { useController } from "react-hook-form";
import { IconInfo } from "@/components/atoms/icons/info";
import { twMerge } from "tailwind-merge";
import { useEffect, useMemo, useRef, useState, useCallback } from "react";

export const TextFieldDefault = ({
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
  result,
  resultColor,
  noSpaceAllowed,
  showCountHelper = false,
  textMask = "",
  ...props
}) => {
  const { field, formState } = useController({ control, name, defaultValue });

  const inputRef = useRef(null);
  const hasMask = !!textMask;
  const maskSlots = useMemo(() => (hasMask ? (textMask.match(/x/gi) || []).length : 0), [textMask, hasMask]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sanitizeRaw = useCallback((s) => {
    const str = s || "";
    return isNumericOnly ? str.replace(/[^0-9]/g, "") : str.replace(/[^a-zA-Z0-9]/g, "");
  });

  const applyMask = (raw, mask) => {
    if (!mask) return raw || "";
    const chars = (raw || "").split("");
    let i = 0;
    let out = "";
    for (let m = 0; m < mask.length; m++) {
      const ch = mask[m];
      if (ch.toLowerCase() === "x") {
        if (i < chars.length) {
          out += chars[i++];
        } else {
          break;
        }
      } else {
        if (i < chars.length) {
          out += ch;
        } else {
          break;
        }
      }
    }
    return out;
  };

  const extractRawFromDisplay = (display, mask) => {
    if (!mask) return display || "";
    const onlyAlphaNum = (display || "").replace(/[^a-zA-Z0-9]/g, "");
    return onlyAlphaNum.slice(0, maskSlots);
  };

  const computeCaretFromRawLen = (rawLen, mask) => {
    if (!mask) return rawLen;
    let needed = rawLen;
    let pos = 0;
    for (let i = 0; i < mask.length; i++) {
      const ch = mask[i];
      if (ch.toLowerCase() === "x") {
        if (needed > 0) {
          needed--;
          pos = i + 1;
        } else {
          break;
        }
      } else {
        if (needed > 0) {
          pos = i + 1;
        } else {
          break;
        }
      }
    }
    return pos;
  };

  const [displayValue, setDisplayValue] = useState(() =>
    hasMask ? applyMask(sanitizeRaw(field.value), textMask) : field.value || ""
  );

  useEffect(() => {
    if (hasMask) {
      const raw = sanitizeRaw(field.value);
      setDisplayValue(applyMask(raw.slice(0, maskSlots), textMask));
    }
  }, [field.value, hasMask, textMask, maskSlots, sanitizeRaw]);

  const getAllowedPattern = () => {
    let allowedPattern = "a-zA-Z0-9";

    if (allowedSpecialCharacters) {
      allowedPattern += allowedSpecialCharacters.replace(
        /[-/\\^$*+?.()|%[\]{}]/g,
        "\\$&"
      );
    }

    if (dontAllowedSpecialCharacters) {
      const disallowedChars = dontAllowedSpecialCharacters.replace(
        /[-/\\^$*+?.()|%[\]{}]/g,
        "\\$&"
      );
      allowedPattern = allowedPattern.replace(
        new RegExp(`[${disallowedChars}\\s]`, "g"),
        ""
      );
    }

    return new RegExp(`^[${allowedPattern}\\s]+$`);
  };

  const handleKeyDown = (e) => {
    if (hasMask) {
      const input = e.target;
      const value = input.value || "";
      const selectionStart = input.selectionStart ?? value.length;
      const selectionEnd = input.selectionEnd ?? value.length;

      const allowedKeys = ["Tab", "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Home", "End"];
      if ((e.ctrlKey || e.metaKey) && ["a", "c", "v", "x"].includes(e.key.toLowerCase())) {
        return;
      }
      if (allowedKeys.includes(e.key)) {
        const isBackspace = e.key === "Backspace";
        const isDelete = e.key === "Delete";
        if (selectionStart !== selectionEnd) {
          return;
        }
        const raw = sanitizeRaw(field.value).slice(0, maskSlots);
        let rawArr = raw.split("");
        if (isBackspace && selectionStart > 0) {
          let pos = selectionStart - 1;
          while (pos > 0 && textMask[pos].toLowerCase() !== "x") pos--;
          if (rawArr.length > 0) rawArr = rawArr.slice(0, rawArr.length - 1);
          const newRaw = rawArr.join("");
          const newDisplay = applyMask(newRaw, textMask);
          e.preventDefault();
          setDisplayValue(newDisplay);
          field.onChange(newRaw);
          requestAnimationFrame(() => {
            try {
              const caret = computeCaretFromRawLen(newRaw.length, textMask);
              input.setSelectionRange(caret, caret);
            } catch {
              // Do nothing
            }
          });
          return;
        }

        if (isDelete && selectionStart < value.length) {
          let pos = selectionStart;
          while (pos < textMask.length && textMask[pos].toLowerCase() !== "x") pos++;
          if (rawArr.length > 0 && pos < textMask.length) {
            const xBefore = (textMask.slice(0, pos).match(/x/gi) || []).length;
            if (xBefore < rawArr.length) {
              rawArr.splice(xBefore, 1);
            } else {
              rawArr = rawArr.slice(0, rawArr.length - 1);
            }
            const newRaw = rawArr.join("");
            const newDisplay = applyMask(newRaw, textMask);
            e.preventDefault();
            setDisplayValue(newDisplay);
            field.onChange(newRaw);
            requestAnimationFrame(() => {
              try {
                const caret = computeCaretFromRawLen(newRaw.length, textMask);
                input.setSelectionRange(caret, caret);
              } catch {
                // Do nothing
              }
            });
            return;
          }
        }
        return;
      }

      const isChar = e.key.length === 1;
      if (isChar) {
        const allow = isNumericOnly ? /[0-9]/ : /[a-zA-Z0-9]/;
        if (!allow.test(e.key)) {
          e.preventDefault();
          return;
        }
        const currentRaw = sanitizeRaw(field.value).slice(0, maskSlots);
        let rawArr = currentRaw.split("");
        const xBeforeCaret = (textMask.slice(0, selectionStart).match(/x/gi) || []).length;
        const xBeforeEnd = (textMask.slice(0, (e.target.selectionEnd ?? selectionStart)).match(/x/gi) || []).length;

        const startIdx = xBeforeCaret;
        const endIdx = Math.min(xBeforeEnd, rawArr.length);
        rawArr.splice(startIdx, endIdx - startIdx, e.key);

        const newRaw = rawArr.join("").slice(0, maskSlots);
        const newDisplay = applyMask(newRaw, textMask);

        e.preventDefault();
        setDisplayValue(newDisplay);
        field.onChange(newRaw);

        requestAnimationFrame(() => {
          try {
            const caret = computeCaretFromRawLen(startIdx + 1, textMask);
            input.setSelectionRange(caret, caret);
          } catch {
            // Do nothing
          }
        });
      }
      return;
    }
    let allowedPattern;
    const allowedKeys = [
      "Tab",
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
    ];
    const alphanumericWithUnderscorePattern = /^[a-zA-Z0-9_]+$/;

    if ((e.ctrlKey || e.metaKey) && e.key === "v") {
      return;
    }


    if (noSpaceAllowed && e.code === "Space") {
      e.preventDefault();
    }
    if (isNumericOnly) {
      allowedPattern = /^[0-9]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (isAlphaNumericOnly) {
      allowedPattern = /^[a-zA-Z0-9]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (isAlphaOnly) {
      allowedPattern = /^[a-zA-Z\s]+$/;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (allowedSpecialCharacters) {
      allowedPattern = getAllowedPattern();
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (isAlphaNumericWithUnderscore) {
      allowedPattern = alphanumericWithUnderscorePattern;
      if (!allowedKeys.includes(e.key) && !allowedPattern.test(e.key)) {
        e.preventDefault();
      }
    }
    if (dontAllowedSpecialCharacters) {
      const disallowedChars = dontAllowedSpecialCharacters.replace(
        /[-/\\^$*+?.()|%[\]{}]/g,
        "\\$&"
      );
      const pattern = new RegExp(`[${disallowedChars}\\s]`, "g");
      if (!allowedKeys.includes(e.key) && pattern.test(e.key)) {
        e.preventDefault();
      }
    }
  };

  const handlePaste = (e) => {
    if (hasMask) {
      if (isCantPaste) {
        e.preventDefault();
        return;
      }
      const pastedData = e.clipboardData.getData("Text") || "";
      const cleaned = sanitizeRaw(pastedData);
      const input = e.target;
      const selectionStart = input.selectionStart ?? 0;
      const selectionEnd = input.selectionEnd ?? 0;

      const currentRaw = sanitizeRaw(field.value).slice(0, maskSlots);
      let rawArr = currentRaw.split("");

      const xStart = (textMask.slice(0, selectionStart).match(/x/gi) || []).length;
      const xEnd = (textMask.slice(0, selectionEnd).match(/x/gi) || []).length;

      rawArr.splice(xStart, Math.max(0, xEnd - xStart), ...cleaned.split(""));

      const newRaw = rawArr.join("").slice(0, maskSlots);
      const newDisplay = applyMask(newRaw, textMask);

      e.preventDefault();
      setDisplayValue(newDisplay);
      field.onChange(newRaw);

      requestAnimationFrame(() => {
        try {
          const caret = computeCaretFromRawLen(xStart + cleaned.length, textMask);
          input.setSelectionRange(caret, caret);
        } catch {
          // Do nothing
        }
      });
      return;
    }

    const pastedData = e.clipboardData.getData("Text");
    let sanitizedData = pastedData;

    if (isCantPaste) {
      e.preventDefault();
      return;
    }

    if (noSpaceAllowed) {
      sanitizedData = sanitizedData.replace(/\s+/g, "");
    }

    if (allowedSpecialCharacters) {
      const specialChars = allowedSpecialCharacters
        ? allowedSpecialCharacters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
        : "";
      const pattern = new RegExp(`[^a-zA-Z0-9${specialChars}\\s]`, "g");
      sanitizedData = pastedData.replace(pattern, "");
    }

    if (dontAllowedSpecialCharacters) {
      const dontAllowedChars = dontAllowedSpecialCharacters
        ? dontAllowedSpecialCharacters.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")
        : "";
      const pattern = new RegExp(`[^a-zA-Z0-9${dontAllowedChars}\\s]`, "g");
      sanitizedData = pastedData.replace(pattern, "");
    }

    if (isNumericOnly) {
      sanitizedData = sanitizedData.replace(/[^0-9]/g, "");
    }

    if (isAlphaOnly) {
      sanitizedData = sanitizedData.replace(/[^a-zA-Z\s]/g, "");
    }

    const { selectionStart, selectionEnd } = e.target;
    const value = e.target.value;
    
    // Check maxLength before creating newValue
    if (maxLength && (value.length - (selectionEnd - selectionStart) + sanitizedData.length) > maxLength) {
      sanitizedData = sanitizedData.substring(0, maxLength - (value.length - (selectionEnd - selectionStart)));
    }

    const newValue =
      value.substring(0, selectionStart) +
      sanitizedData +
      value.substring(selectionEnd);

    e.target.value = newValue;

    const newPosition = selectionStart + sanitizedData.length;
    e.target.setSelectionRange(newPosition, newPosition);

    field.onChange(e);
    e.preventDefault();
  };

  const handleChangeMasked = (e) => {
    const nextDisplay = e.target.value || "";
    const raw = extractRawFromDisplay(nextDisplay, textMask).slice(0, maskSlots);
    const newDisplay = applyMask(raw, textMask);
    setDisplayValue(newDisplay);
    field.onChange(raw);

    requestAnimationFrame(() => {
      try {
        const caret = computeCaretFromRawLen(raw.length, textMask);
        inputRef.current?.setSelectionRange(caret, caret);
      } catch {
        // Do nothing
      }
    });
  };

  return (
    <div className={className}>
      {props.title ? (
        <TextLabel className={twMerge("", titleClassName)}>
          {props.title}
        </TextLabel>
      ) : null}
      <TextField
        id={(props.id || `field-${name}`)}
        variant="outlined"
        error={!!formState.errors?.[name]}
        helperText={
          <>
            <span>
              {formState.errors?.[name]?.message ||
                (maxLength && showLength ? `Maksimal ${maxLength} Karakter` : "")}
            </span>
            {maxLength && showCountHelper && (
              <span style={{ marginLeft: "auto" }}>
                {(field.value?.length || 0)}/{maxLength}
              </span>
            )}
          </>
        }
        FormHelperTextProps={{
          style: {
            fontSize: "16px",
            marginLeft: 0,
            display: "flex",
            justifyContent: "space-between",
          },
        }}
        size="small"
        className={"w-full " + className}
        disabled={isDisabled}
        onKeyDown={
          hasMask
            ? handleKeyDown
            : (noSpaceAllowed ||
              isAlphaOnly ||
              isNumericOnly ||
              isAlphaNumericOnly ||
              isAlphaNumericWithUnderscore ||
              allowedSpecialCharacters ||
              dontAllowedSpecialCharacters
                ? handleKeyDown
                : null)
        }
        onPaste={
          hasMask
            ? handlePaste
            : (noSpaceAllowed ||
              isAlphaOnly ||
              isNumericOnly ||
              isCantPaste ||
              allowedSpecialCharacters ||
              dontAllowedSpecialCharacters
                ? handlePaste
                : null)
        }
        inputRef={inputRef}
        inputProps={{
          maxLength: hasMask ? textMask.length : maxLength,
        }}
        InputProps={{
          style: {
            borderRadius: "10px",
            backgroundColor: isDisabled ? "#EDEDED" : "#FFFFFF",
            color: isDisabled ? "#131313" : "#000000",
          },
          endAdornment: !!formState.errors?.[name] && (
            <InputAdornment position="end" sx={{ paddingTop: "5px" }}>
              <span className="text-white">
                <IconInfo color="#E84040" isSmall />
              </span>
            </InputAdornment>
          ),
        }}
        value={hasMask ? (displayValue ?? "") : (field.value ?? "")}
        onChange={hasMask ? handleChangeMasked : field.onChange}
        {...props}
        {...(hasMask ? {} : field)}
      />
      {result && (
        <div
          style={{
            fontSize: "14px",
            color: resultColor,
            marginTop: "4px",
          }}
        >
          {result}
        </div>
      )}
    </div>
  );
};