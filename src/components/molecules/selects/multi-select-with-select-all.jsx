import { TextLabel } from "@/components/atoms/typographies/label";
import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { Box, Checkbox, Chip, FormControlLabel } from "@mui/material";
import { twMerge } from "tailwind-merge";
import React from "react";
import { CheckboxBorder } from "@/components/atoms/icons/checkbox-border";
import { CheckboxChecked } from "@/components/atoms/icons/checkbox-checked";

export default function MultipleSelectChip({
    name = "",
    control = null,
    loadOptions = null,
    options = [],
    defaultValue = [],
    className,
    isDisabled,
    titleClassName,
    preventOverflow = false,
    ...props
}) {
    const { field, formState } = useController({ control, name, defaultValue });
    const [selectAll, setSelectAll] = React.useState(false);

    // Update selectAll state based on selected values
    React.useEffect(() => {
        const isAllSelected = options.length > 0 && field.value?.length === options.length;
        setSelectAll(isAllSelected);
    }, [field.value, options.length]);
    

    // Fungsi untuk memilih semua opsi
    const handleSelectAll = (e) => {
        if (e.target.checked) {
            field.onChange(options); // Pilih semua opsi
        } else {
            field.onChange([]); // Kosongkan semua pilihan
        }
        setSelectAll(e.target.checked);
    };

    const customStyles = {
        control: (base) => ({
            ...base,
            minHeight: 40,
            ...(preventOverflow && {
                maxHeight: 80,
                overflowY: "auto",
            }),
            border: `${name in formState.errors ? "1px solid #d32f2f" : "1px solid #ced4da"}`,
            borderRadius: "10px",
            marginBottom: "4px",
            backgroundColor: isDisabled ? '#FAFAFA' : '#FFFFFF',
        }),
        dropdownIndicator: (base) => ({
            ...base,
            color: `${name in formState.errors ? "#D32F2F" : isDisabled ? '#9e9e9e' : "#004B8F"}`,
        }),
        valueContainer: (base) => ({
            ...base,
            padding: "2px 8px",
            ...(preventOverflow && {
                gap: "4px",
            }),
        }),
        menu: (base) => ({
            ...base,
            zIndex: 99,
        }),
    };

    const SelectComponent = loadOptions ? AsyncSelect : Select;

    return (
        <div className={className}>
            {props.title ? (
                <div className="flex items-center justify-between">
                    <TextLabel className={twMerge("", titleClassName)}>
                        {props.title}
                    </TextLabel>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={selectAll}
                                onChange={handleSelectAll}
                                disabled={isDisabled}
                                icon={<CheckboxBorder />}
                                checkedIcon={<CheckboxChecked disabled={isDisabled} />}
                            />
                        }
                        label="Select All"
                        labelPlacement="end"
                    />
                </div>
            ) : null}

            <SelectComponent
                isMulti
                loadOptions={loadOptions}
                options={options}
                value={field.value}
                styles={customStyles}
                isClearable
                isDisabled={isDisabled}
                components={{
                    IndicatorSeparator: () => null,
                }}
                placeholder={props.placeholder}
                {...props}
                {...field}
            />
            {props.boxChip ? (
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                    {field.value?.map((option) => (
                        <Chip
                            key={option.value}
                            label={option.label}
                            onDelete={() => {
                                const newValue = field.value.filter((v) => v.value !== option.value);
                                field.onChange(newValue);
                            }}
                        />
                    ))}
                </Box>
            ) : null }

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
