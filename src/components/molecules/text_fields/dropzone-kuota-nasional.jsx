import React, { useRef, useState } from "react";
import Dropzone from "react-dropzone";
import Image from "next/image";
import { Typography } from "@mui/material";
import { ButtonDefault } from "@/components/atoms/buttons/default";
import { TextLabel } from "@/components/atoms/typographies/label";
import { IconUpload } from "@/components/atoms/icons/upload";
import { IconFileOutline } from "@/components/atoms/icons/file-outline";
import { IconButtons } from "@/components/atoms/buttons/iconButtons";
import { IconCross } from "@/components/atoms/icons/cross";
import { IconFileCSV } from "@/components/atoms/icons/fileCSV";
import { IconFilePDF } from "@/components/atoms/icons/filePDF";
import { IconFileJPG } from "@/components/atoms/icons/fileJPG";
import { IconWarningTriangle } from "@/components/atoms/icons/warning-triangle";

const DropzoneKuotaNasional = ({
  existsFiles,
  settings = {
    allowedExtensions: {},
    maxSize: 5,
    maxFiles: 2,
    isImagePreview: false,
  },
  labels = {
    title: null,
    dropzoneTitle: "Drag & Drop",
    allowedFileLabel: "Max File Size",
    titleButton: "Pilih File",
  },
  icons = {
    default: <IconUpload />,
    button: <IconFileOutline />,
  },
  sx = {
    container: {},
    button: {},
  },
  callbacks = {
    uploadFile: null,
    removeFile: null,
    customError: null,
  },
}) => {
  const dropzoneRef = useRef();
  const [selectedFile, setSelectedFile] = useState([]);
  const [status, setStatus] = useState("success");
  const [message, setMessage] = useState("");

  // =========================
  // HANDLE DROP FILE
  // =========================
  const handleDropedFiles = async (files) => {
    setStatus("success");
    setMessage("");

    if (selectedFile.length + files.length > settings.maxFiles) {
      setStatus("error");
      setMessage(`Maksimal ${settings.maxFiles} file`);
      return;
    }

    const filesData = files.map((file) => ({
      source: URL.createObjectURL(file), // preview
      file,                              // FILE MENTAH
      fileName: file.name,
      originName: file.name,
      size: file.size,
      type: file.type,
    }));

    const newFiles = [...selectedFile, ...filesData];
    setSelectedFile(newFiles);

    callbacks?.uploadFile?.(newFiles);
  };

  // =========================
  // HANDLE DELETE FILE
  // =========================
  const handleDeleteSelectedFile = (index) => {
    const newFiles = selectedFile.filter((_, i) => i !== index);
    callbacks?.removeFile?.(selectedFile[index]?.fileName);
    callbacks?.uploadFile?.(newFiles);
    setSelectedFile(newFiles);
  };

  // =========================
  // HANDLE ERROR
  // =========================
  const handleError = (errors) => {
    errors.forEach((item) => {
      const code = item?.errors[0]?.code;

      if (code === "file-too-large") {
        setStatus("error");
        setMessage(`Ukuran file maksimal ${settings.maxSize} MB`);
      }

      if (code === "file-invalid-type") {
        const formats = Object.values(settings.allowedExtensions)
          .flat()
          .join(", ");
        setStatus("error");
        setMessage(`Format file harus ${formats}`);
      }

      if (code === "too-many-files") {
        setStatus("error");
        setMessage(`Maksimal ${settings.maxFiles} file`);
      }
    });
  };

  return (
    <div>
      {labels?.title && <TextLabel className="my-2">{labels.title}</TextLabel>}

      <div
        className="border-2"
        style={{
          borderStyle: selectedFile.length ? "solid" : "dashed",
          borderColor: status === "error" ? "#EB4D4B" : "#00529C",
          borderRadius: 10,
          padding: "40px 0",
          ...sx.container,
        }}
      >
        <Dropzone
          ref={dropzoneRef}
          accept={settings.allowedExtensions}
          maxFiles={settings.maxFiles}
          maxSize={settings.maxSize * 1024 * 1024}
          multiple={settings.maxFiles > 1}
          onDrop={handleDropedFiles}
          onDropRejected={handleError}
        >
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="text-center py-4">
              <input {...getInputProps()} />
              {icons.default}
              <Typography fontWeight={700}>
                {labels.dropzoneTitle}
              </Typography>
              <Typography sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }} >atau</Typography>
              <ButtonDefault
                className="justify-center px-5 my-1"
                model="fill"
                color="#00529C"
                startIcon={icons.button}
                disabled={selectedFile.length >= settings.maxFiles}
                style={{ ...sx.button }}
              >
                {labels.titleButton}
              </ButtonDefault>
              <Typography sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}>
                {labels.allowedFileLabel}
              </Typography>
            </div>
          )}
        </Dropzone>
      </div>

      {status === "error" && (
        <div className="mt-2 flex items-center">
          <IconWarningTriangle color="#E84040" />
          <span className="ml-2 text-sm text-brigunaRed">
            {message}
          </span>
        </div>
      )}

      {/* FILE LIST */}
      <div className="my-4 flex flex-wrap gap-3">
        {existsFiles}
        {selectedFile.length > 0 && (
          <>
            {selectedFile.map((data, index) => (
              <div key={index} className="mx-6 relative" style={{ maxWidth: 90 }}>
                <IconButtons
                  className="absolute right-0 -top-3 z-10"
                  onClick={() => handleDeleteSelectedFile(index)}
                >
                  <IconCross />
                </IconButtons>

                {data.originName.includes(".pdf") ? (
                  <IconFilePDF />
                ) : data.originName.match(/\.(jpg|jpeg|png)$/) ? (
                  settings.isImagePreview ? (
                    <Image src={data.source} width={53} height={53} alt="" />
                  ) : (
                    <IconFileJPG />
                  )
                ) : (
                  <IconFileCSV />
                )}

                <div className="text-xs truncate mt-1">{data.originName}</div>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default DropzoneKuotaNasional;
