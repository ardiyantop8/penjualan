import { TextLabel } from "@/components/atoms/typographies/label";
import { useController } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import AsyncSelect from "react-select/async";
import Select from "react-select";
import { twMerge } from "tailwind-merge";
import { Box, Chip } from "@mui/material";

export default function MultipleSelectChip({
    name = "",
    control = null,
    loadOptions = null,
    options = [],
    defaultValue = [],
    className,
    isDisabled,
    titleClassName,
    optionColors = ["#cfe2f3", "#ffdfba", "#d9ead3", "#f4cccc", "#d9d2e9"],
    onChange, // Tambahkan onChange sebagai prop
    ...props
    }) {
    const { field, formState } = useController({ control, name, defaultValue });

    const customStyles = {
        control: (base) => ({
        ...base,
        minHeight: 40,
        border: `${name in formState.errors ? "1px solid #d32f2f" : "1px solid #ced4da"}`,
        borderRadius: "10px",
        marginBottom: "4px",
        backgroundColor: isDisabled ? '#EDEDED' : '#FFFFFF'
        }),
        dropdownIndicator: (base) => ({
        ...base,
        color: `${name in formState.errors ? "#D32F2F" : isDisabled ? '#9e9e9e' : "#004B8F"}`,
        }),
        multiValue: (base, { index }) => ({
            ...base,
            backgroundColor: optionColors[index % optionColors.length] || "#e0e0e0",
        }),
    };

    const SelectComponent = loadOptions ? AsyncSelect : Select;

    const handleChange = (selectedOptions) => {
        field.onChange(selectedOptions); // Sinkronisasi dengan React Hook Form
        if (onChange) {
            onChange(selectedOptions); // Panggil fungsi onChange dari prop
        }
    };

    return (
        <div className={className}>
        {props.title ? (
            <TextLabel className={twMerge("", titleClassName)}>
            {props.title}
            </TextLabel>
        ) : null}
        <SelectComponent
            isMulti
            loadOptions={loadOptions}
            options={options}
            value={field.value} // ✅ ambil value dari form
            defaultValue={defaultValue}
            styles={customStyles}
            isClearable
            isDisabled={isDisabled}
            components={{
                IndicatorSeparator: () => null,
            }}
            placeholder={props.placeholder}
            onChange={handleChange} // ✅ gunakan custom handleChange
            onBlur={field.onBlur} // ✅ tetap pakai onBlur dari form
            ref={field.ref} // ✅ ref tetap dipakai
            {...props} // props tambahan lain
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
        ): null }

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
