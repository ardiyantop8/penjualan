import Dropzone from "react-dropzone";
import { IconUpload } from "@/components/atoms/icons/upload";
import { ButtonDefault } from "@/components/atoms/buttons/default";
import { useEffect, useRef, useState } from "react";
import { IconFileCSV } from "@/components/atoms/icons/fileCSV";
import { IconCross } from "@/components/atoms/icons/cross";
import { IconButtons } from "@/components/atoms/buttons/iconButtons";
import { IconFilePDF } from "@/components/atoms/icons/filePDF";
import { IconFileJPG } from "@/components/atoms/icons/fileJPG";
import { TextLabel } from "@/components/atoms/typographies/label";
import { Typography } from "@mui/material";
import { IconInfo } from "@/components/atoms/icons/info";
import Image from "next/image";
import { ButtonOutlined } from "@/components/atoms/buttons/outlined";
import { DeleteForeverOutlined } from "@mui/icons-material";

export const TextFieldUploadFile = ({
  label = "Upload Document",
  allowedExtensions = [], // jika empty array maka bisa upload semua format
  maxSize = 5, // dalam satuan MB
  allowedFileLabel = "CSV / PDF Max " + maxSize + " MB",
  uploadFile = null, // custom function saat handling upload file
  removeFile = null, // custom function saat handling delete file
  fileName = null,
  multipleFile = false,
  isImagePreview = false, // flaging untuk menggantikan icon gambar dengan preview gambar khusus file gambar
}) => {

  const dropzoneRef = useRef();
  const [selectedFile, setSelectedFile] = useState([]);
  const [isFileSelected, setIsFileSelected] = useState(false);
  const [statusDashedUpload, setStatusDashedUpload] = useState("success");
  const [messageDashedUpload, setMessageDashedUpload] = useState("");

  const validator = (file) => {
    setStatusDashedUpload("success");
    // if (file.length == 1) {
    if (file.size > maxSize * (10 ** 6)) {
      setStatusDashedUpload("error")
      setMessageDashedUpload('Ukuran file terlalu besar. Maksimal size file ' + maxSize + 'MB.')
      return false
    }
    if (allowedExtensions.length !== 0 && !allowedExtensions.some(ext => file.name.includes(ext))) {
      setStatusDashedUpload("error")
      setMessageDashedUpload('Format file Anda tidak sesuai. Silahkan sesuaikan format file ' + allowedExtensions.join(', ') + '.')
      return false
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      let imgSource = reader.result.toString()
      let encoded = imgSource.replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      if (!multipleFile) {
        setSelectedFile([
          {
            source: imgSource,
            fileData: encoded,
            fileName: fileName ?? file.name,
            originName: file.name,
            size: file.size,
          },
        ]);
      } else {
        setSelectedFile([
          ...selectedFile,
          {
            fileData: encoded,
            fileName: fileName ?? file.name,
            originName: file.name,
          },
        ]);
      }

      if (uploadFile !== null) {
        await uploadFile(fileName, file);
      }

      setIsFileSelected(true);
    };
    // } else {
    //   setStatusDashedUpload("error")
    // }
  };

  const handleDeleteSelectedFile = (param) => {
    const deleteData = selectedFile.filter((item) => item.fileName !== param.fileName);
    if (removeFile != null) {
      removeFile(param.fileName)
    }
    setSelectedFile(deleteData);
  };

  useEffect(() => {
    if (selectedFile.length) {
      setIsFileSelected(true);
    } else {
      setIsFileSelected(false);
    }
  }, [selectedFile]);

  return (
    <div className="pt-5">
      <TextLabel className="mt-0 my-2">{label}</TextLabel>
      <div
        className={
          multipleFile === false && selectedFile.length > 0
            ? "border-solid border-2"
            : "border-dashed border-2"
        }
        style={{
          borderColor:
            multipleFile === false && selectedFile.length > 0
              ? "#00529C"
              : statusDashedUpload === "error"
              ? "#EB4D4B"
              : "#BDBDBD",
          borderRadius: "10px",
        }}
      >
        {multipleFile === false && selectedFile.length > 0 ? (
          <div className="flex flex-col justify-center items-center space-y-4 xl:space-y-0 xl:flex xl:flex-row xl:justify-between xl:items-center h-[200px] px-6">
            <div className="flex items-center">
              {selectedFile[0].originName.includes(".jpg") ||
              selectedFile[0].originName.includes(".jpeg") ||
              selectedFile[0].originName.includes(".png") ? (
                isImagePreview ? (
                  <Image
                    src={selectedFile[0].source}
                    alt={selectedFile[0].originName}
                    width={53}
                    height={53}
                  />
                ) : (
                  <IconFileJPG />
                )
              ) : selectedFile[0].originName.includes(".pdf") ? (
                <IconFilePDF />
              ) : (
                <IconFileCSV />
              )}
              <div className="flex flex-col items-start justify-center ml-2">
                <h3>{selectedFile[0].originName}</h3>
                <span className="text-[#999999]">{`${Math.ceil(
                  selectedFile[0].size / 1024
                )}kb`}</span>
              </div>
            </div>
            <div>
              <ButtonOutlined
                colorType="danger"
                startIcon={<DeleteForeverOutlined sx={{ color: "#E84040" }} />}
                onClick={handleDeleteSelectedFile.bind(this, selectedFile[0])}
                sx={{
                  paddingX: "20px",
                  paddingY: "10px",
                }}
              >
                Hapus
              </ButtonOutlined>
            </div>
          </div>
        ) : (
          <Dropzone
            multiple={true}
            // maxFiles={1}
            ref={dropzoneRef}
            // accept={'.xlsx'}
            excludeAcceptAllOption
            validator={validator}
          >
            {({ getRootProps, getInputProps }) => (
              <section>
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="text-center py-4">
                    <IconUpload />
                    <Typography
                      sx={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: "#303030",
                        marginY: "5px",
                      }}
                    >
                      Drag & Drop
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#BDBDBD",
                        marginY: "5px",
                      }}
                    >
                      atau
                    </Typography>
                    <ButtonDefault
                      className="justify-center px-5 my-1"
                      model="outline"
                      color="#00529C"
                    >
                      Pilih Files
                    </ButtonDefault>
                    <Typography
                      sx={{
                        fontSize: "12px",
                        color: "#BDBDBD",
                        marginY: "5px",
                      }}
                    >
                      {allowedFileLabel}
                    </Typography>
                  </div>
                </div>
              </section>
            )}
          </Dropzone>
        )}
      </div>

      {isFileSelected && multipleFile === true ? (
        <>
          <div className="my-4 flex">
            {selectedFile.map((data, index) => (
              <div className="mx-2 relative" key={index}>
                <div className="sticky top-0">
                  <IconButtons
                    sx={{ width: "auto", top: "-10px" }}
                    className="absolute ml-14"
                    onClick={() => handleDeleteSelectedFile(data)}
                  >
                    <IconCross />
                  </IconButtons>
                  {data.originName.includes(".jpg") ||
                  data.originName.includes(".jpeg") ||
                  data.originName.includes(".png") ? (
                    isImagePreview ? (
                      <Image
                        src={data.source}
                        alt={data.originName}
                        width={53}
                        height={53}
                      />
                    ) : (
                      <IconFileJPG />
                    )
                  ) : data.originName.includes(".pdf") ? (
                    <IconFilePDF />
                  ) : (
                    <IconFileCSV />
                  )}
                </div>
                <div className="text-xs font-medium">{data.originName}</div>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {statusDashedUpload === "error" ? (
        <div className="mt-2 flex flex-row">
          <IconInfo color="#E84040" isSmall />
          <span className="text-brigunaRed text-sm ml-2">
            {messageDashedUpload}
          </span>
        </div>
      ) : null}

      {/* <div className='flex justify-end mt-4 pb-6 gap-x-2'>
            {isButtonUploadWhitelistLoading ? (
              <CircularProgress />
            ) : (
              <button
                className='text-white rounded-main py-2 px-4'
                style={{
                  backgroundColor: isFileSelected ? '#1078CA' : '#E1E4EA'
                }}
                disabled={!isFileSelected}
                onClick={handleUploadWhitelistData}
              >
                <span>Upload</span>
              </button>
            )}
          </div> */}
    </div>
  );
};