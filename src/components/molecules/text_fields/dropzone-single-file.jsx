import React from 'react';
import 'regenerator-runtime/runtime';
// import { ButtonDefault } from '@/components/atoms/buttons/default';
import Image from 'next/image';
import Dropzone from "react-dropzone";
import { IconUpload } from "@/components/atoms/icons/upload";
import { useState } from "react";
import { Typography } from "@mui/material";
import { TextLabel } from "@/components/atoms/typographies/label";
import { IconFileOutline } from '@/components/atoms/icons/file-outline';
import { IconButtons } from '@/components/atoms/buttons/iconButtons';
import { IconCross } from '@/components/atoms/icons/cross';
import { IconFileCSV } from '@/components/atoms/icons/fileCSV';
import { IconFilePDF } from '@/components/atoms/icons/filePDF';
// import { IconFileJPG } from '@/components/atoms/icons/fileJPG';
import { IconWarningTriangle } from '@/components/atoms/icons/warning-triangle';

const DropzoneCustom = ({
  settings = {
    allowedExtensions: [],
    maxSize: 5, // MB
    maxFiles: 1, // ⬅️ single file
    isImagePreview: true,
    dropzoneHeight: "120px",
  },
  labels = {
    title: null,
    dropzoneTitle: "Drag & Drop",
    dropzoneTitleColor: "#303030",
    dropzoneTitleAlign: "vertical",
    allowedFileLabel: "Max File Size " + settings?.maxSize + " MB",
    titleButton: "Pilih File",
  },
  icons = {
    default: <IconUpload />,
    button: <IconFileOutline />,
  },
  callbacks = {
    uploadFile: null,
    removeFile: null,
    customError: null,
  }
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statusDashedUpload, setStatusDashedUpload] = useState("success");
  const [messageDashedUpload, setMessageDashedUpload] = useState("");

  const handleDropedFiles = (files) => {
    setStatusDashedUpload("success");
    const file = files[0]; // ⬅️ hanya ambil file pertama
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const imgSource = e.target.result;
      const encoded = imgSource.replace(/^data:(.*,)?/, "");
      setSelectedFile({
        source: imgSource,
        fileData: encoded,
        fileName: file.name,
        originName: file.name,
        type: file.type,
      });
    };
    reader.readAsDataURL(file);

    if (callbacks?.uploadFile) {
      callbacks.uploadFile(file);
    }
  };

  const handleDeleteSelectedFile = () => {
    setSelectedFile(null);
    if (callbacks?.uploadFile) callbacks.uploadFile(null);
    if (callbacks?.removeFile) callbacks.removeFile();
  };

  return (
    <div>
      {labels?.title && <TextLabel className="my-2">{labels?.title}</TextLabel>}
      <div
        className="border-2 flex items-center justify-center relative"
        style={{
            borderStyle: selectedFile ? "solid" : "dashed",
            borderColor:
            statusDashedUpload === "error"
                ? "#EB4D4B"
                : selectedFile
                ? "#00529C"
                : "#EDEDED",
            borderRadius: "10px",
            padding: settings?.dropzoneHeight || "120px 0px",
        }}
        >
        <Dropzone
          accept={settings?.allowedExtensions}
          maxFiles={1}
          maxSize={settings?.maxSize * (10 ** 6)}
          multiple={false}
          onDrop={handleDropedFiles}
          onDropRejected={(fileRejections) => {
            const file = fileRejections[0];
            const error = file?.errors[0];

            if (error?.code === "file-too-large") {
              setStatusDashedUpload("error");
              setMessageDashedUpload(`File melebih ukuran yang diizinkan maks ${settings?.maxSize} MB`);
            } else if (error?.code === "file-invalid-type") {
              const exts = Object.values(settings?.allowedExtensions || {})
                .flat()
                .join(", ");
              setStatusDashedUpload("error");
              setMessageDashedUpload("File tidak valid, harus berformat: " + exts);
            } else {
              setStatusDashedUpload("error");
              setMessageDashedUpload("Gagal upload file, silakan cek kembali.");
            }
          }}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="w-full h-full flex flex-col items-center justify-center">
              <input {...getInputProps()} />

              {!selectedFile ? (
                <>
                  {icons?.default}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      color: labels?.dropzoneTitleColor,
                      fontWeight: 700,
                      marginY: "5px",
                    }}
                  >
                    {labels?.dropzoneTitle}
                  </Typography>
                  <Typography sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}>
                    {labels?.allowedFileLabel}
                  </Typography>
                </>
              ) : (
                <>
                    <div>
                        <IconButtons
                            sx={{ width: "auto" }}
                            className="absolute left-10 top-5 z-10"
                            onClick={handleDeleteSelectedFile}
                        >
                        <IconCross />
                        </IconButtons>
                    </div>
                    <div className="relative flex flex-col items-center">

                    {/* Preview file */}
                    {selectedFile.type.includes("image") ? (
                        <Image src={selectedFile.source} alt={selectedFile.fileName} width={80} height={80} />
                    ) : selectedFile.type.includes("pdf") ? (
                        <IconFilePDF />
                    ) : (
                        <IconFileCSV />
                    )}

                    <div className="text-xs mt-2 text-center max-w-[150px] truncate">
                        {selectedFile.originName}
                    </div>
                    </div>
                </>
              )}
            </div>
          )}
        </Dropzone>
      </div>

      {statusDashedUpload === "error" && (
        <div className="mt-2 flex flex-row">
          <IconWarningTriangle color="#E84040" />
          <span className="text-brigunaRed text-sm ml-2">{messageDashedUpload}</span>
        </div>
      )}
    </div>
  );
};


export default DropzoneCustom;
