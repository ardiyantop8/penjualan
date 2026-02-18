import React from 'react';
import 'regenerator-runtime/runtime';
import { ButtonDefault } from '@/components/atoms/buttons/default';
import Image from 'next/image';
import Dropzone from "react-dropzone";
import { IconUpload } from "@/components/atoms/icons/upload";
import { useEffect, useRef, useState } from "react";
import { Typography } from "@mui/material";
import { TextLabel } from "@/components/atoms/typographies/label";
import { IconFileOutline } from '@/components/atoms/icons/file-outline';
import { IconButtons } from '@/components/atoms/buttons/iconButtons';
import { IconCross } from '@/components/atoms/icons/cross';
import { IconFileCSV } from '@/components/atoms/icons/fileCSV';
import { IconFilePDF } from '@/components/atoms/icons/filePDF';
import { IconFileJPG } from '@/components/atoms/icons/fileJPG';
import { IconWarningTriangle } from '@/components/atoms/icons/warning-triangle';

const DropzoneCustom = ({
    settings = {
        allowedExtensions: [], // jika empty array maka bisa upload semua format
        maxSize: 5, // dalam satuan MB
        maxFiles: 2, // jumlah file yang diizinkan
        isImagePreview: false, // flaging untuk menggantikan icon gambar dengan preview gambar khusus file gambar
    },
    labels = {
        title: null,
        dropzoneTitle: "Drag & Drop", 
        allowedFileLabel: "Max File Size " + settings?.maxSize + " MB",
        titleButton: "Pilih File",
    },
    icons = {
        default: <IconUpload />,
        button: <IconFileOutline />,
    },
    sx = {
        // ! Is there is any custom style for another component please add it into this props and bind them into the component
        container: {},
        button: {}
    },
    callbacks = {
        uploadFile: null,
        removeFile: null,
        customError: null,
    }
}) => {

    const dropzoneRef = useRef();
    const [selectedFile, setSelectedFile] = useState([]);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [statusDashedUpload, setStatusDashedUpload] = useState("success");
    const [messageDashedUpload, setMessageDashedUpload] = useState("");

    const handleDeleteSelectedFile = (index) => {
        if(selectedFile?.length !== 1) {
            const deleteData = selectedFile?.filter((item, i) => i !== index);
            
            if(callbacks?.removeFile !== undefined && callbacks?.removeFile != null) {
                callbacks?.removeFile(selectedFile[index].fileName)
            }
            if(callbacks?.uploadFile !== undefined && callbacks?.uploadFile !== null){
                callbacks?.uploadFile(deleteData);
            }
            setSelectedFile(deleteData);
            setIsFileSelected(true);
        }else{
            if(callbacks?.uploadFile !== undefined && callbacks?.uploadFile !== null){
                callbacks?.uploadFile([]);
            }
            setSelectedFile([]);
            setIsFileSelected(false);
        }
    };

    useEffect(() => {
        if(callbacks?.customError !== undefined && callbacks?.customError !== null) {
            setStatusDashedUpload("error")
            setMessageDashedUpload(callbacks?.customError)
        }
    }, [callbacks?.customError]);

    const handleError = (error) => {

        console.log(error);
        error?.map((item) => {
            // ! Is there is any condition for error handling please add it into this function check the code from the error object

            if(item?.errors[0]?.code === "file-too-large") {
                setStatusDashedUpload("error")
                setMessageDashedUpload('Ukuran file terlalu besar. Maksimal size file ' + settings?.maxSize + 'MB.')
            }

            if(item?.errors[0]?.code === "file-invalid-type") {
                
                const uniqueValuesSet = [];

                // Iterate over the object values and add each item to the Set
                for (const values of Object.values(settings?.allowedExtensions)) {
                    for (const value of values) {
                        uniqueValuesSet.push(value);
                    }
                }

                setStatusDashedUpload("error")
                setMessageDashedUpload('Format file Anda tidak sesuai. Silahkan sesuaikan format file ' + uniqueValuesSet.join(', ') + '.')
            }

            if(item?.errors[0]?.code === "too-many-files") {
                setStatusDashedUpload("error")
                setMessageDashedUpload('Maksimal file yang dapat diupload adalah ' + settings?.maxFiles + ' file.')
            }
        });
    }

    const handleDropedFiles = async (file) => {
        setSelectedFile(null);
        handlerMultipleFiles(file);
        
        if(callbacks?.uploadFile !== null){
            callbacks.uploadFile(file);
        }
    };

    const readFile = async (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            let imgSource = event.target.result;
            let encoded = imgSource.replace(/^data:(.*,)?/, "");
            if (encoded.length % 4 > 0) {
                encoded += "=".repeat(4 - (encoded.length % 4));
            }
            return({
                source: imgSource,
                fileData: encoded,
                fileName: file.name,
                originName: file.name,
            });
        };
        reader.onerror = (error) => console.log(error);
    };

    const handlerMultipleFiles = async (files) => {
        const filesData = await files.map(file => readFile(file));
        setSelectedFile([...selectedFile, ...filesData]);
    }

    useEffect(() => {
        if (selectedFile?.length) {
            setIsFileSelected(true);
        } else {
            setIsFileSelected(false);
        }
    }, [selectedFile]);

    return (
        <div>
            {labels?.title !== null && labels?.title !== "" && <TextLabel className="my-2">{labels?.title}</TextLabel>}
            <div className="border-2"
                style={{
                    borderStyle: isFileSelected ? "solid" : "dashed",
                    borderColor: statusDashedUpload !== "error" ? isFileSelected ? '#00529C' : "#EDEDED" : "#EB4D4B",
                    borderRadius: "10px",
                    padding: "40px 0px",
                    ...sx?.container
                }}
            >
                <Dropzone
                    accept={settings?.allowedExtensions}
                    maxFiles={settings?.maxFiles}
                    maxSize={settings?.maxSize * (10 ** 6)}
                    multiple={settings?.maxFiles > 1}
                    ref={dropzoneRef}
                    excludeAcceptAllOption
                    onDrop={handleDropedFiles}
                    onDropRejected={handleError}
                >
                    {({ getRootProps, getInputProps }) => (
                    <section className="container-fluid">
                        <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="text-center py-4">
                                {icons?.default}
                                <Typography
                                    sx={{
                                        fontSize: "16px",
                                        fontWeight: 700,
                                        color: "#303030",
                                        marginY: "5px",
                                    }}
                                >
                                    {labels?.dropzoneTitle}
                                </Typography>
                                <Typography
                                    sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}
                                >
                                    atau
                                </Typography>
                                <ButtonDefault
                                    className="justify-center px-5 my-1"
                                    model="fill"
                                    color="#00529C"
                                    style={{...sx?.button}}
                                    startIcon={icons?.button}
                                    disabled={selectedFile?.length >= settings?.maxFiles}
                                >
                                {labels?.titleButton}
                                </ButtonDefault>
                                <Typography
                                sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}
                                >
                                {labels?.allowedFileLabel}
                                </Typography>
                            </div>
                        </div>
                    </section>
                    )}
                </Dropzone>
            </div>

            {isFileSelected && (
                <>
                <div className="my-4 flex">
                    {
                        selectedFile.map((data, index) => (
                            <div className="mx-2 relative" style={{maxWidth: "90px"}} key={index}>
                                <div className="sticky top-0">
                                <IconButtons
                                    sx={{ width: "auto", top: "-10px" }}
                                    className="absolute ml-14"
                                    onClick={() => handleDeleteSelectedFile(index)}
                                >
                                    <IconCross />
                                </IconButtons>
                                {data?.originName?.includes(".jpg") || data?.originName?.includes(".jpeg") || data?.originName?.includes(".png") ? ( settings?.isImagePreview
                                    ? <Image
                                        src={data?.fileData}
                                        alt={data?.originName}
                                        width={53}
                                        height={53}
                                    />
                                    : <IconFileJPG />
                                ) : data?.originName?.includes(".pdf") ? (
                                    <IconFilePDF />
                                ) : (
                                    <IconFileCSV />
                                )}
                                </div>
                                <div className="text-xs font-medium" style={{textOverflow: "ellipsis", whiteSpace: "nowrap", overflow: "hidden"}}>{data.originName}</div>
                            </div>
                        ))
                    }
                </div>
                </>
            )}
    
            {statusDashedUpload === 'error' && (
            <div className='mt-2 flex flex-row'>
                <IconWarningTriangle color="#E84040"/>
                <span className='text-brigunaRed text-sm ml-2'>
                {messageDashedUpload}
                </span>
            </div>
            )}
        </div>
    );
};

export default DropzoneCustom;
