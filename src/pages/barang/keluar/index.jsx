import React from 'react'
import { FORM_TYPE, FormBuilder } from '@/components/organisms/forms/builder';
import { ButtonDefault } from '@/components/atoms/buttons/default';
import { IconRecycle } from "@/components/atoms/icons/recycle";
import SearchIcon from "@mui/icons-material/Search";
import { useFormValidation } from '@/hooks/useFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";

const BarangKeluar = () => {
    const [resetDisabled, setResetDisabled] = React.useState(true);
    const [searchDisabled, setSearchDisabled] = React.useState(true);

    /* field schema untuk form filter */
    const fieldsSchema = React.useMemo(() => {
        return [
            {
                name: "namaBarang",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "nullable",
                    },
                ],
            },
        ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const { defaultValues, validationSchema } = useFormValidation(fieldsSchema);
    const methods = useForm({
        mode: "all",
        defaultValues,
        resolver: yupResolver(validationSchema),
    });
    const { control, watch, setValue } = methods;
    const filter = watch();
    const onReset = () => {
        console.log("Reset form");
        // setValue("jenis", null, { shouldValidate: true });
        // setValue("tanggal", null, { shouldValidate: true });
        // if (typeof filter?.kanwil  === "object") {
        //     setValue("kanwil", null, { shouldValidate: true });
        // }
        // if (typeof filter?.cabang  === "object") {
        //     setValue("cabang", null, { shouldValidate: true });
        // }
        // if (typeof filter?.unit  === "object") {
        //     setValue("unit", null, { shouldValidate: true });
        // }
        // if (typeof filter?.pekerja  === "object") {
        //     setValue("pekerja", null, { shouldValidate: true });
        // }
        // setValueFilter({});
        // setData({});
        // setDataCount({});
    }

    const onSubmit = (data) => {
        console.log("Submit form with data: ", data);
    }
    return (
        <div className="w-full">
            <FormBuilder
                className="flex flex-col gap-2"
                fields={[
                    {
                        type: FORM_TYPE.TEXT_FIELD,
                        name: "namaBarang",
                        placeholder: "Nama Barang",
                        title: "Nama Barang",
                    },
                    {
                        type: FORM_TYPE.CUSTOM,
                        component: (
                            <div className="gap-2 flex justify-end mt-3">
                                <ButtonDefault
                                    sx={{
                                        padding: '6px 24px',
                                        borderColor: resetDisabled == true ? '#EDEDED' : "#ED6E12"
                                    }}
                                    model="outline"
                                    color="#ED6E12"
                                    onClick={onReset}
                                    className='flex'
                                    startIcon={<IconRecycle color={resetDisabled == true ? "#A6A6A6" : "#ED6E12"}/>}
                                    disabled={resetDisabled}
                                >
                                    Reset
                                </ButtonDefault>
                                <ButtonDefault
                                    sx={{
                                    padding: "6px 24px",
                                    }}
                                    model="fill"
                                    color="#ED6E12"
                                    type="submit"
                                    className="flex"
                                    startIcon={<SearchIcon />}
                                    disabled={searchDisabled}
                                >
                                    Cari
                                </ButtonDefault>
                            </div>
                        ),
                    },
                ]}
                methods={methods}
                onSubmit={onSubmit}
            />
        </div>
    )
}

export default BarangKeluar