import React from "react";
import "regenerator-runtime/runtime";
import { ButtonDefault } from "@/components/atoms/buttons/default";
import Image from "next/image";
import Dropzone from "react-dropzone";
import { IconUpload } from "@/components/atoms/icons/upload";
import { useEffect, useRef, useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import { TextLabel } from "@/components/atoms/typographies/label";
import { IconFileOutline } from "@/components/atoms/icons/file-outline";
import { IconCross } from "@/components/atoms/icons/cross";
import { IconFileCSV } from "@/components/atoms/icons/fileCSV";
import { IconFilePDF } from "@/components/atoms/icons/filePDF";
import { IconFileJPG } from "@/components/atoms/icons/fileJPG";
import { IconWarningTriangle } from "@/components/atoms/icons/warning-triangle";
import { IconFileDocx } from "@/components/atoms/icons/fileDocx";
import { IconFileXls } from "@/components/atoms/icons/fileXls";

const DropzoneMultiple = ({
  settings = {
    allowedExtensions: [], // * If empty array then all file types are allowed
    maxSize: 5, // * In MB
    maxFiles: 2, // * Number of files allowed
    isImagePreview: false, // * Flag to enable image preview
    disabled: false, // * Flag to disable dropzone
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
    // ! If there is any custom style for another component please add it into this props and bind them into the component
    container: {
      isSolidBorder: false,
    },
    button: {},
    wordings: {
      or: {},
      helper: {},
    },
  },
  callbacks = {
    uploadFile: null,
    removeFile: null,
    customError: null,
    onFileClick: null, // * Callback to handle click on file preview
  },
  initialFiles = null, // * Initial files to display (for API loaded files)
}) => {
  const dropzoneRef = useRef();
  const prevInitialFilesRef = useRef();
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [statusDashedUpload, setStatusDashedUpload] = useState("success");
  const [messageDashedUpload, setMessageDashedUpload] = useState("");

  // Handle initial files from props (for API loaded files)
  useEffect(() => {
    // Update ref to current value
    prevInitialFilesRef.current = initialFiles;

    if (initialFiles) {

      // Convert initialFiles to array if it's a single file
      const filesToSet = Array.isArray(initialFiles)
        ? initialFiles
        : [initialFiles];

      // Filter out null/undefined files
      const validFiles = filesToSet.filter(
        (file) => file && (file.name || file.fileName || file.originName)
      );

      if (validFiles.length > 0) {
        setSelectedFile(validFiles);
        setIsFileSelected(true);
      } else {
        setSelectedFile([]);
        setIsFileSelected(false);
      }
    } else {
      setSelectedFile([]);
      setIsFileSelected(false);
    }
  }, [initialFiles]);

  const handleDeleteSelectedFile = (index) => {
    // Reset error state when file is deleted
    setStatusDashedUpload("success");
    setMessageDashedUpload("");

    const fileToDelete = selectedFile[index];

    // Detailed fileName extraction dengan priority order
    let fileName = null;

    // Priority: originName > fileName > name
    if (fileToDelete?.originName) {
      fileName = fileToDelete.originName;
    } else if (fileToDelete?.fileName) {
      fileName = fileToDelete.fileName;
    } else if (fileToDelete?.name) {
      fileName = fileToDelete.name;
    } else {
      fileName = `file_${index}`;
    }

    //  IMPORTANT: If there is a removeFile callback, delegate to parent
    if (callbacks?.removeFile !== undefined && callbacks?.removeFile !== null) {
      // Delegate deletion to parent without changing internal state
      callbacks.removeFile(fileName);

      // DO NOT change selectedFile here, let the initialFiles prop that is updated from parent
    } else {
      // Fallback: handle deletion locally
      if (selectedFile?.length !== 1) {
        const deleteData = selectedFile?.filter((item, i) => i !== index);
        setSelectedFile(deleteData);
        setIsFileSelected(deleteData.length > 0);
      } else {
        setSelectedFile([]);
        setIsFileSelected(false);
      }
    }
  };

  useEffect(() => {
    if (
      callbacks?.customError !== undefined &&
      callbacks?.customError !== null &&
      callbacks?.customError !== ""
    ) {
      setStatusDashedUpload("error");
      setMessageDashedUpload(callbacks?.customError);
    } else {
      // Reset error state when customError is empty/null
      setStatusDashedUpload("success");
      setMessageDashedUpload("");
    }
  }, [callbacks?.customError]);

  const handleError = (error) => {
    // IMPORTANT: Do not call uploadFile callback when error
    // Error should not delete existing files

    error?.map((item) => {
      // ! If there is any condition for error handling please add it into this function check the code from the error object

      if (item?.errors[0]?.code === "file-too-large") {
        setStatusDashedUpload("error");
        setMessageDashedUpload(
          "Ukuran file terlalu besar. Maksimal size file " +
            settings?.maxSize +
            "MB."
        );
      }

      if (item?.errors[0]?.code === "file-invalid-type") {
        const uniqueValuesSet = [];

        // Iterate over the object values and add each item to the Set
        for (const values of Object.values(settings?.allowedExtensions)) {
          for (const value of values) {
            uniqueValuesSet.push(value);
          }
        }

        setStatusDashedUpload("error");
        setMessageDashedUpload(
          "Format file Anda tidak sesuai. Silahkan sesuaikan format file " +
            uniqueValuesSet.join(", ") +
            "."
        );
      }

      if (item?.errors[0]?.code === "too-many-files") {
        const currentFileCount = selectedFile?.length || 0;
        const remainingSlots = settings?.maxFiles - currentFileCount;
        setStatusDashedUpload("error");
        setMessageDashedUpload(
          remainingSlots > 0
            ? `Anda hanya dapat menambahkan ${remainingSlots} file lagi. Maksimal ${settings?.maxFiles} file.`
            : `Maksimal ${settings?.maxFiles} file telah tercapai.`
        );
      }
    });
  };

  const handleDropedFiles = (file) => {

    // Check if disabled
    if (settings?.disabled) {
      return;
    }

    // Validate maxFiles: check if the number of existing files + new files exceeds maxFiles
    const currentFileCount = selectedFile?.length || 0;
    const newFileCount = file?.length || 0;
    const totalFileCount = currentFileCount + newFileCount;

    if (totalFileCount > settings?.maxFiles) {
      const remainingSlots = settings?.maxFiles - currentFileCount;
      setStatusDashedUpload("error");
      setMessageDashedUpload(
        remainingSlots > 0
          ? `Tersisa ${remainingSlots} slot unggahan. Batas maksimal adalah ${settings?.maxFiles} file.`
          : `Maksimal ${settings?.maxFiles} file telah tercapai.`
      );
      return;
    }

    // Reset error state when file is dropped
    setStatusDashedUpload("success");
    setMessageDashedUpload("");

    // Process files to DropzoneMultiple format first
    handlerMultipleFiles(file, (filesData) => {

      // TEMPORARY: Update local state for immediate UI feedback
      setSelectedFile((prevFiles) => {
        const existingFiles = prevFiles || [];
        const combinedFiles = [...existingFiles, ...filesData];
        return combinedFiles;
      });

      // Then delegate to parent if there is a callback
      if (callbacks?.uploadFile !== null) {
        // Pass processed files (not raw files) to parent
        callbacks.uploadFile(filesData);

      } else {
        //
      }
    });
  };

  const readFile = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      let imgSource = event.target.result;
      let encoded = imgSource.replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      callback({
        source: imgSource,
        fileData: encoded,
        fileName: file.name,
        originName: file.name,
      });
    };
    reader.onerror = (error) => console.error(error);
  };

  const handlerMultipleFiles = (files, callback) => {
    let filesData = [];
    let completed = 0;

    files.forEach((file) => {
      readFile(file, (fileData) => {
        filesData.push(fileData);
        completed++;
        if (completed === files.length) {
          callback(filesData);
        }
      });
    });
  };

  useEffect(() => {
    if (selectedFile?.length) {
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  }, [selectedFile]);

  // Combined disabled state: either parent disabled or maxFiles reached
  const isDropzoneDisabled =
    settings?.disabled || selectedFile?.length >= settings?.maxFiles;

  return (
    <div>
      {labels?.title !== null && labels?.title !== "" && (
        <TextLabel className="my-2">{labels?.title}</TextLabel>
      )}
      <div
        style={{
          borderStyle:
            isFileSelected && sx?.container?.isSolidBorder ? "solid" : "dashed",
          borderColor: isDropzoneDisabled
            ? "#CCCCCC" // Gray border when disabled or maxFiles reached
            : sx?.container?.isSolidBorder && isFileSelected
            ? "#00529C"
            : statusDashedUpload !== "error"
            ? sx?.container?.isSolidBorder && isFileSelected
              ? "#00529C"
              : "#EDEDED"
            : "#EB4D4B",
          borderRadius: "10px",
          cursor: isDropzoneDisabled ? "not-allowed" : "pointer",
          opacity: isDropzoneDisabled ? 0.6 : 1, // Reduce opacity when disabled
          backgroundColor: isDropzoneDisabled ? "#F5F5F5" : "transparent", // Light gray background when disabled
          ...sx?.container,
        }}
      >
        <Dropzone
          accept={settings?.allowedExtensions}
          maxFiles={Math.max(
            1,
            settings?.maxFiles - (selectedFile?.length || 0)
          )} // Dynamic maxFiles berdasarkan sisa slot
          maxSize={settings?.maxSize * 10 ** 6}
          multiple={settings?.maxFiles > 1}
          ref={dropzoneRef}
          excludeAcceptAllOption
          onDrop={handleDropedFiles}
          onDropRejected={handleError}
          disabled={isDropzoneDisabled}
        >
          {({ getRootProps, getInputProps }) => (
            <section className="container">
              <div
                {...(isDropzoneDisabled ? {} : getRootProps())}
                style={{
                  ...(isDropzoneDisabled && {
                    pointerEvents: "none",
                    cursor: "not-allowed",
                  }),
                }}
              >
                <input {...getInputProps()} disabled={isDropzoneDisabled} />
                <div className="text-center py-[40px]">
                  {icons?.default}
                  <Typography
                    sx={{
                      fontSize: "16px",
                      fontWeight: 700,
                      color: isDropzoneDisabled ? "#999999" : "#303030",
                      marginY: "5px",
                    }}
                  >
                    {/* {isDropzoneDisabled
                      ? `Maksimal ${settings?.maxFiles} file tercapai`
                      : labels?.dropzoneTitle} */}
                      {labels?.dropzoneTitle}
                  </Typography>
                  <Typography
                    sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}
                    style={{ ...sx?.wordings?.or }}
                  >
                    atau
                  </Typography>
                  <ButtonDefault
                    className="justify-center px-5 my-1"
                    model={sx?.button?.model || "fill"}
                    color="#00529C"
                    style={{ ...sx?.button }}
                    startIcon={icons?.button}
                    disabled={isDropzoneDisabled}
                  >
                    {labels?.titleButton}
                  </ButtonDefault>
                  <Typography
                    sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}
                    style={{ ...sx?.wordings?.helper }}
                  >
                    {isDropzoneDisabled
                      ? `${selectedFile?.length || 0}/${
                          settings?.maxFiles
                        } file diupload`
                      : `${labels?.allowedFileLabel} | ${
                          selectedFile?.length || 0
                        }/${settings?.maxFiles} file`}
                  </Typography>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>

      {isFileSelected && (
        <Box
          className="mt-4"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "flex-start",
          }}
        >
          {selectedFile.map((data, index) => (
            <Box
              key={index}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "90px",
                flexShrink: 0,
              }}
            >
              {/* Delete Button - positioned at top-right corner */}
              <IconButton
                aria-label="delete"
                size="small"
                sx={{
                  position: "absolute",
                  top:
                    data?.originName?.includes(".jpg") ||
                    data?.originName?.includes(".jpeg") ||
                    data?.originName?.includes(".png")
                      ? "-6px"
                      : "0px",
                  right:
                    data?.originName?.includes(".jpg") ||
                    data?.originName?.includes(".jpeg") ||
                    data?.originName?.includes(".png")
                      ? "-1px"
                      : "-7.5px",
                }}
                onClick={() => handleDeleteSelectedFile(index)}
              >
                <IconCross />
              </IconButton>

              {/* File Icon Container - Clickable */}
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "80px",
                  height: "80px",
                  cursor: callbacks?.onFileClick ? "pointer" : "default",
                }}
                onClick={() => {
                  if (callbacks?.onFileClick) {
                    callbacks.onFileClick(data, index);
                  }
                }}
              >
                {data?.originName?.includes(".jpg") ||
                data?.originName?.includes(".jpeg") ||
                data?.originName?.includes(".png") ? (
                  settings?.isImagePreview ? (
                    // <Box
                    //   sx={{
                    //     cursor: callbacks?.onFileClick ? "pointer" : "default",
                    //     borderRadius: "8px",
                    //     border: "1px solid #E5E7EB",
                    //     py: "8px",
                    //     px: "12px",
                    //   }}
                    // >
                    <Image
                      src={data?.source || data?.url}
                      alt={data?.originName}
                      width={64}
                      height={64}
                      priority={true}
                      loading="eager" // Non-lazy loading for preview images
                      quality={80} // Reasonable compression for preview images
                      style={{
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #E5E7EB",
                      }}
                    />
                  ) : (
                    // </Box>
                    <IconFileJPG />
                  )
                ) : data?.originName?.includes(".pdf") ? (
                  <IconFilePDF />
                ) : data?.originName?.includes(".doc") ||
                  data?.originName?.includes(".docx") ? (
                  <IconFileDocx />
                ) : data?.originName?.includes(".xls") ||
                  data?.originName?.includes(".xlsx") ? (
                  <IconFileXls />
                ) : (
                  <IconFileCSV />
                )}
              </Box>

              {/* File Name */}
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "12px",
                  fontWeight: 500,
                  color: callbacks?.onFileClick ? "#00529C" : "#374151",
                  lineHeight: 1,
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textDecoration: callbacks?.onFileClick ? "underline" : "none",
                  cursor: callbacks?.onFileClick ? "pointer" : "default",
                  px: "4px",
                  mt: "-6px",
                }}
                onClick={() => {
                  if (callbacks?.onFileClick) {
                    callbacks.onFileClick(data, index);
                  }
                }}
                title={data.originName} // Show full name on hover
              >
                {data.originName}
              </Box>
            </Box>
          ))}
        </Box>
      )}

      {statusDashedUpload === "error" && (
        <div className="mt-4 flex flex-row">
          <IconWarningTriangle color="#E84040" />
          <span className="text-briRed text-sm ml-2">
            {messageDashedUpload}
          </span>
        </div>
      )}
    </div>
  );
};

export default DropzoneMultiple;
