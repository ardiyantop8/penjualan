import React, { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/router';
import { Card, Button, Typography } from '@mui/material'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';

import { FORM_TYPE, FormBuilder } from '@/components/organisms/forms/builder';
import { ButtonDefault } from '@/components/atoms/buttons/default';
import { useFormValidation } from '@/hooks/useFormValidation';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from "react-hook-form";
import SaveIcon from '@mui/icons-material/Save';
import UploadFileIcon from "@mui/icons-material/UploadFile"

const AddBarangMasuk = () => {
    const [file, setFile] = useState(null)
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [loadingJenis, setLoadingJenis] = useState(true);
    const [optionJenis, setOptionJenis] = useState([]);

    const handleFileChange = (event) => {
        setFile(event.target.files[0])
    }
    const backToBarangMasuk = () => {
        router.push('/barang/masuk');
    }

    const fieldsSchema = useMemo(() => {
        return [
            {
                name: "namaBarang",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "required",
                    },
                ],
            },
            {
                name: "hargaModal",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "required",
                    },
                ],
            },
            {
                name: "hargaJual",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "required",
                    },
                ],
            },
            {
                name: "size",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "required",
                    },
                ],
            },
            {
                name: "rangeUsia",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "required",
                    },
                ],
            },
            {
                name: "jmlhStok",
                getValue: function () {
                    return null;
                },
                validationType: "string",
                validations: [
                    {
                        type: "required",
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
    }
    const linkGetJenisBarang = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=inquiryJenisBarang"
    const linkCreateBarang = "https://script.google.com/macros/s/AKfycbygxgxShdjdNEgT5Cn9ruPyTDGU1dw8v2WLJPGmFgk3MeLvBj6ivhkjBlBZJy285SxD/exec?action=createBarang"
    const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });

    const onSubmit = async (data) => {
        try {
            let base64Image = null;
            let mimeType = null;
            let fileName = null;

            if (file) {
            base64Image = await toBase64(file);
            mimeType = file.type;
            fileName = file.name;
            }

            const res = await fetch(linkCreateBarang, {
            method: "POST",
            body: JSON.stringify({
                action: "createBarang",
                namaBarang: data.namaBarang,
                idJenis: data.jenisBarang.value,
                hargaModal: data.hargaModal,
                hargaJual: data.hargaJual,
                size: data.size,
                rangeUsia: data.rangeUsia,
                stok: data.jmlhStok,
                status: "aktif",
                imageBase64: base64Image,
                mimeType: mimeType,
                fileName: fileName
            })
            });

            const result = await res.json();
            if (result.responseCode === "00") {
                alert("Barang berhasil ditambahkan!");
            }

        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetch(linkGetJenisBarang, {
            method: "POST",
            body: JSON.stringify({
                page: 1,
                rows: 20
            })
        })
        .then(r => r.json())
        .then(result => {
            if (result.responseCode === '00') {
                setOptionJenis(result.data.data.map(item => ({
                    label: item.namajenis,
                    value: item.idjenis
                })));
            } else {
                alert(result.responseMessage);
            }
        })
        .catch(err => {
            console.error(err);
            alert('Gagal memuat jenis barang.');
        })
        .finally(() => {
            setLoadingJenis(false);
        });
    },[]);
    return (
        <Card className="p-4 border border-gray-300">
            <div onClick={backToBarangMasuk} className="flex items-center gap-2">
                <ArrowBackRoundedIcon className="text-indigo-600"/>
                <h3>Kembali</h3>
            </div>
            <div className="py-4">
                <hr />
            </div>
            <div className="w-full py-4 px-2">
                <FormBuilder
                    className="sm:grid sm:grid-cols-3 gap-2"
                    fields={[
                        {
                            type: FORM_TYPE.SELECT,
                            name: "jenisBarang",
                            placeholder: "Jenis Barang",
                            title: "Jenis Barang",
                            control: control,
                            options: optionJenis,
                            isDisabled: loadingJenis
                        },
                        {
                            type: FORM_TYPE.TEXT_FIELD,
                            name: "namaBarang",
                            placeholder: "Nama Barang",
                            title: "Nama Barang",
                            control: control
                        },
                        {
                            type: FORM_TYPE.TEXT_FIELD_PREFIX_POSTFIX_CURRENCY,
                            name: "hargaModal",
                            placeholder: "Harga Modal",
                            title: "Harga Modal",
                            control: control,
                            prefixPostFix: "Rp.",
                            position: "start",
                            thousandSeparator: ".",
                            decimalSeparator: ",",
                            decimalScale: 0,
                            inputTextAlign: "right"
                        },
                        {
                            type: FORM_TYPE.TEXT_FIELD_PREFIX_POSTFIX_CURRENCY,
                            name: "hargaJual",
                            placeholder: "Harga Jual",
                            title: "Harga Jual",
                            control: control,
                            prefixPostFix: "Rp.",
                            position: "start",
                            thousandSeparator: ".",
                            decimalSeparator: ",",
                            decimalScale: 0,
                            inputTextAlign: "right"
                        },
                        {
                            type: FORM_TYPE.TEXT_FIELD,
                            name: "size",
                            placeholder: "Size",
                            title: "Size",
                            control: control
                        },
                        {
                            type: FORM_TYPE.TEXT_FIELD,
                            name: "rangeUsia",
                            placeholder: "Range Usia",
                            title: "Range Usia",
                            control: control
                        },
                        {
                            type: FORM_TYPE.TEXT_FIELD,
                            name: "jmlhStok",
                            placeholder: "Jumlah Stok",
                            title: "Jumlah Stok",
                            control: control
                        },
                        {
                            type: FORM_TYPE.CUSTOM,
                            component: (
                                <div className="col-span-3 py-4">
                                    <label className="block text-lg font-medium text-gray-700 mb-3">
                                        Upload Gambar Barang
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="file"
                                            id="fileInput"
                                            hidden
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                        <label
                                            htmlFor="fileInput"
                                            className="flex flex-col items-center justify-center w-full p-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-indigo-400 transition-all duration-200 group"
                                        >
                                            <div className="flex flex-col items-center justify-center pt-2 pb-2">
                                                <svg
                                                    className="w-12 h-12 text-gray-400 group-hover:text-indigo-500 transition-colors"
                                                    stroke="currentColor"
                                                    fill="none"
                                                    viewBox="0 0 48 48"
                                                >
                                                    <path
                                                        d="M28 8H12a4 4 0 00-4 4v24a4 4 0 004 4h24a4 4 0 004-4V20m-14-12v16m0 0l-4-4m4 4l4-4"
                                                        strokeWidth={2}
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    />
                                                </svg>
                                                <p className="mt-3 text-sm font-medium text-gray-700 group-hover:text-indigo-600">
                                                    Klik atau drag gambar di sini
                                                </p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    PNG, JPG, JPEG (Max 5MB)
                                                </p>
                                            </div>
                                        </label>
                                    </div>

                                    {/* File Preview */}
                                    {file && (
                                        <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
                                            <div className="flex items-center gap-3">
                                                <div className="flex-shrink-0">
                                                    <img
                                                        src={URL.createObjectURL(file)}
                                                        alt="preview"
                                                        className="h-16 w-16 object-cover rounded-lg shadow-sm"
                                                    />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                                        {file.name}
                                                    </p>
                                                    <p className="text-xs text-gray-600 mt-1">
                                                        {(file.size / 1024).toFixed(2)} KB
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setFile(null)}
                                                    className="flex-shrink-0 p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <svg
                                                        className="w-5 h-5"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ),
                        },
                        {
                            type: FORM_TYPE.CUSTOM,
                            component: (
                                <div className="col-span-3 gap-2 flex flex-col sm:flex-row sm:justify-end mt-3">
                                    <ButtonDefault
                                        sx={{
                                        padding: "6px 24px",
                                        }}
                                        model="fill"
                                        color="#ED6E12"
                                        type="submit"
                                        className="flex w-full sm:w-auto justify-center"
                                        startIcon={<SaveIcon />}
                                    >
                                        Simpan
                                    </ButtonDefault>
                                </div>
                            ),
                        },
                    ]}
                    methods={methods}
                    onSubmit={onSubmit}
                />
            </div>
        </Card>
    )
}

export default AddBarangMasuk