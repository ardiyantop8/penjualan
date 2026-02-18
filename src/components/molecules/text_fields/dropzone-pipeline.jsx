import Dropzone from "react-dropzone";
import PropTypes from 'prop-types';
import dayjs from "dayjs";
import { IconUpload } from "@/components/atoms/icons/upload";
import { ButtonDefault } from "@/components/atoms/buttons/default";
import { useEffect, useRef, useState } from "react";
import { IconFileCSV } from "@/components/atoms/icons/fileCSV";
import { IconCross } from "@/components/atoms/icons/cross";
import { IconButtons } from "@/components/atoms/buttons/iconButtons";
import { IconFilePDF } from "@/components/atoms/icons/filePDF";
import { IconFileJPG } from "@/components/atoms/icons/fileJPG";
import { IconFileDocx } from "@/components/atoms/icons/fileDocx";
import { IconFileXls } from "@/components/atoms/icons/fileXls";
import { TextLabel } from "@/components/atoms/typographies/label";
import { Typography } from "@mui/material";
import { IconInfo } from "@/components/atoms/icons/info";
import { ModalConfirmUtil, ModalLoadingUtil, ModalSuccessUtil } from "@/helpers/modal";
import { useDeleteDokumentasiKorporasi } from "@/repositories/prakarsa/prakarsaInternasional";
export const TextFieldUploadFileCp = (props) => {
  const {
    label,
    onFileSelect,
    fileName,
    isFileSelected,
    setIsFileSelected,
    uploadedFile = {},
    removeFile = null,
    type = "",
    tab = "",
    id = "",
    refno = "",
    historyFile = {},
    // totalTab  = 0,
    totalDoc = 0,
    allowedExtensions = ['.pdf', '.xlsx', '.xls', '.csv', '.docx', '.doc', '.jpg', '.jpeg', '.png'],
    maxSize = 10,//10 Mb
    allowedFileLabel = " Image / PDF / Word / Excel " + maxSize + " MB",
  } = props
  const dropzoneRef = useRef(tab);
  const [selectedFile, setSelectedFile] = useState([]);
  const [statusDashedUpload, setStatusDashedUpload] = useState("success");
  const [messageDashedUpload, setMessageDashedUpload] = useState("")
  const { mutate: _deleteDokumentasiKorporasi } = useDeleteDokumentasiKorporasi();

  const validator = (file) => {
    setStatusDashedUpload("success");
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
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      const extension = file.name.split('.').pop();
      const formattedDate = dayjs().format('YYMMDDHHmmss');
      const newFileName = `${fileName}_${formattedDate}.${extension}`;
      let decodeResult = decodeEncodedString(encoded, file.type)
      setSelectedFile([
        ...selectedFile,
        {
          fileName: newFileName,
          type: fileName,
          tab: tab,
          fileData: encoded,
          typeFile: file.type,
          result: decodeResult,
          urlFile: null,
          status: "new",
          id_pengajuan: id,
          refno: refno,
        },
      ]);

      setIsFileSelected(tab, type, true);
      const renamedFile = new File([file], newFileName, { name: file.name });

      if (uploadedFile[tab] === undefined) {

        uploadedFile[tab] = renamedFile;
      } else if (uploadedFile[tab] !== undefined && Array.isArray(uploadedFile[tab])) {

        uploadedFile[tab]?.push(renamedFile);
      } else {
        let temp = [];
        temp.push(uploadedFile[tab]);
        temp.push(renamedFile);
        uploadedFile[tab] = temp;
      }

      onFileSelect(tab, fileName, uploadedFile[tab], refno, id, newFileName, type, "new");
    };
  };

  const handleDeleteSelectedFile = (data) => {
    const nama = data.fileName;
    const status = data.status;
    const id_pengajuan = data.id_pengajuan;
    const refno = data.refno;
    const jenis_dokumen = data.type;
    if (status === "old") {
      ModalConfirmUtil.showModal(
        `Apakah Anda yakin ingin menghapus dokumen ${nama}?`,
        () => {
          try {
            ModalLoadingUtil.showModal();
            _deleteDokumentasiKorporasi(
              {
                id_pengajuan: id_pengajuan,
                refno: refno,
                jenis_dokumen: jenis_dokumen,
                nama_file: nama
              },
              {
                onSuccess: (data) => {
                  if (data.responseCode == "00") {
                    ModalSuccessUtil.showModal(`Berhasil menghapus dokumentasi ${nama}`);
                  }
                },
                onSettled: () => {
                  ModalConfirmUtil.hideModal();
                  ModalLoadingUtil.hideModal();
                },
              }
            );
          } catch (error) {
            console.error(error);
            ModalLoadingUtil.hideModal();
          }
        }
      )
    }
    const deleteData = selectedFile.filter((item) => item.fileName !== nama);
    if (removeFile != null) {
      removeFile({
        fileName: nama,
        type: jenis_dokumen,
        tab: tab,
        status: status,
        id_pengajuan: id_pengajuan,
        refno: refno
      });
    }
    setSelectedFile(deleteData);
  };

  function filterDuplikat(array) {
    var hasil = [];
    var objekYangSudahDilihat = {};

    for (var i = 0; i < array.length; i++) {
      var obj = array[i];
      var kunci = JSON.stringify(obj);

      // Periksa apakah objek sudah dilihat sebelumnya
      if (!objekYangSudahDilihat[kunci]) {
        hasil.push(obj);
        objekYangSudahDilihat[kunci] = true;
      }
    }

    return hasil;
  }



  let outputData = [];
  function convertFile(file, data = null) {
    const reader = new FileReader();
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, "");
      if (encoded.length % 4 > 0) {
        encoded += "=".repeat(4 - (encoded.length % 4));
      }
      let decodeResult = decodeEncodedString(encoded, file.type)
      if (!outputData.some(item => item.fileName === file.name)) {
        // Jika tidak ada, lakukan push array
        outputData.push({
          ...selectedFile, // Tambahkan properti dari selectedFile
          fileName: file.name,
          typeFile: file.type,
          type: data.jenis,
          tab: data.tab,
          fileData: encoded,
          result: decodeResult,
          urlFile: data.urlFile,
          status: data.status,
          id_pengajuan: parseInt(data.id_pengajuan),
          refno: data.refno,
        });
      }

      let typeDoc = extractString(file.name)
      if (typeDoc === 'data_finansial') {
        setIsFileSelected(tab, type, true);
      }
      if (typeDoc === 'dokumen_legalitas') {
        setIsFileSelected(tab, type, true);
      }
      if (typeDoc === 'dokumen_agunan') {
        setIsFileSelected(tab, type, true);
      }
      if (typeDoc === 'dokumen_lain') {
        setIsFileSelected(tab, type, true);
      }
      outputData = filterDuplikat(outputData);

      setSelectedFile(outputData);
    };
    reader.readAsDataURL(file);
  }


  function extractString(filename) {
    // Pisahkan string berdasarkan karakter '_'
    const parts = filename.split('_');

    // Ambil bagian kedua, yaitu "data_finansial"
    // dan hilangkan ekstensi file
    const extractedString = parts.slice(0, 2).join('_');

    return extractedString;
  }

  function convertHistoryFile(historyFile) {
    var arrayFiltered = historyFile.filter(function (element) {
      return element !== undefined;
    });
    var adaUndefined = arrayFiltered.length !== historyFile.length;
    if (!adaUndefined) {
      if (totalDoc === historyFile.length) {
        const filteredData = historyFile.filter(item => item.tab === tab);

        filteredData.forEach(item => {
          if (item.jenis === fileName) {
            let file = item.file
            convertFile(file, item)
          }

        })
      }

    }
  }







  function decodeEncodedString(encoded, type) {
    // Dekode string yang telah diencode
    // let buffer = new ArrayBuffer(decoded.length);
    let decoded = Buffer.from(encoded, 'base64').toString('binary');

    // Buat array buffer dari string yang telah didekode
    let buffer = Buffer.from(decoded, 'binary');

    // Buat array dengan tipe data unsigned 8-bit integer

    // eslint-disable-next-line no-undef
    let uintArray = new Uint8Array(buffer);

    let blob = new Blob([uintArray], { type: type });

    // Buat objek URL dari blob
    let url = URL.createObjectURL(blob);

    return url;
  }


  function saveFile(url, fileName) {

    // Buat elemen anchor untuk menautkan URL objek
    let a = document.createElement('a');
    a.href = url;
    a.download = fileName; // Nama file yang diinginkan

    // Klik tautan secara otomatis untuk mengunduh file
    a.click();
  }

  useEffect(() => {
    if (historyFile.length > 0) {
      var arrayFiltered = historyFile?.filter(function (element) {
        return element !== undefined;
      });

      // Cek apakah arrayFiltered memiliki panjang yang sama dengan array asli
      var adaUndefined = arrayFiltered.length !== historyFile.length;

      if (!adaUndefined) {

        if (selectedFile.length) {
          setIsFileSelected(tab, type, true);
        } else if (isFileSelected && historyFile !== null) {
          convertHistoryFile(historyFile)
        } else {
          setIsFileSelected(tab, type, false);
        }
      }

    }


    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFile]);


  useEffect(() => { // load data history
    if (historyFile.length > 0) {
      convertHistoryFile(historyFile)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [historyFile]);


  return (
    <div className="pt-5">
      <TextLabel className="mt-0 my-2">{label}</TextLabel>
      <div
        className="border-dashed border-2"
        style={{
          borderColor: statusDashedUpload === "error" ? "#EB4D4B" : "#BDBDBD",
          borderRadius: "10px",
        }}
      >
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
                    sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}
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
                    sx={{ fontSize: "12px", color: "#BDBDBD", marginY: "5px" }}
                  >
                    {allowedFileLabel}
                  </Typography>
                </div>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
      
      {isFileSelected ? (
        <>
          <div className="my-4 flex flex-wrap">
            {selectedFile.map((data, index) => (
              // (data.type)
              (tab === data.tab && data.type === fileName) && (
                <div className="mx-2 relative" key={`${data.type}_${tab}_${index}`}>
                  <div className="sticky top-0">
                    <IconButtons
                      sx={{ width: "auto", top: "-20px", position: "absolute", marginLeft: '5rem' }}
                      // className="absolute ml-24"
                      onClick={() => handleDeleteSelectedFile(data)}
                    >
                      <IconCross />
                    </IconButtons>
                    {data.fileName.includes(".jpg") ||
                      data.fileName.includes(".jpeg") ||
                      data.fileName.includes(".png") ? (
                      <IconButtons
                        sx={{ width: "fit-content" }}
                        // className="absolute ml-14"
                        onClick={() => saveFile(data.result, data.fileName)}
                      >
                        <IconFileJPG />
                      </IconButtons>
                    ) : data.fileName.includes(".pdf") ? (
                      <IconButtons
                        sx={{ width: "fit-content" }}
                        // className="absolute ml-14"
                        onClick={() => saveFile(data.result, data.fileName)}
                      >
                        <IconFilePDF />
                      </IconButtons>
                    ) : data.fileName.includes(".csv") ? (
                      <IconButtons
                        sx={{ width: "fit-content" }}
                        // className="absolute ml-14"
                        onClick={() => saveFile(data.result, data.fileName)}
                      >
                        <IconFileCSV />
                      </IconButtons>
                    ) : data.fileName.includes(".docx") || data.fileName.includes(".doc") ? (
                      <IconButtons
                        sx={{ width: "fit-content" }}
                        // className="absolute ml-14"
                        onClick={() => saveFile(data.result, data.fileName)}
                      >
                        <IconFileDocx />
                      </IconButtons>
                    ) :
                      data.fileName.includes(".xlsx") || data.fileName.includes(".xls") ? (
                        <IconButtons
                          sx={{ width: "fit-content" }}
                          // className="absolute ml-14"
                          onClick={() => saveFile(data.result, data.fileName)}
                        >
                          <IconFileXls />
                        </IconButtons>
                      ) : (
                        <IconButtons
                          sx={{ width: "fit-content" }}
                          // className="absolute ml-14"
                          onClick={() => saveFile(data.result, data.fileName)}
                        >
                          <IconFileCSV />
                        </IconButtons>
                      )}
                  </div>
                  <div className="text-xs font-light w-[120px] text-wrap pb-5">{data.fileName.replace(/_/g, " ")}</div>

                </div>
              )
            ))}
          </div>
        </>
      ) : null}

      {statusDashedUpload === 'error' ? (
        <div className='mt-2 flex flex-row'>
          <IconInfo color="#E84040" isSmall />
          <span className='text-brigunaRed text-sm ml-2'>
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

TextFieldUploadFileCp.propTypes = {
  isFileSelected: PropTypes.bool,
  setIsFileSelected: PropTypes.func,
  dataFile: PropTypes.object,
};

TextFieldUploadFileCp.defaultProps = {
  setIsFileSelected: () => { },
  dataFile: {}
};


export default TextFieldUploadFileCp;
