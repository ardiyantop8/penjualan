import { useEffect, useRef, useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonDefault } from '../buttons/default';

// Izin Kamera Skeleton UI
const PermissionsComponent = () => (
    <div className='py-[80px] bg-[#F5F5F5] flex flex-col items-center'>
        <div className='w-[348px] h-[164px] border-black border-[3px] p-[16px] rounded-2xl mx-auto bg-white flex flex-col justify-between'>
            <div className='flex flex-col'>
                <div className='w-[130px] h-[20px] bg-[#F5F5F5] mb-3 rounded-lg' />
                <div className='flex gap-2'>
                    <div className='w-[20px] h-[20px] bg-[#F5F5F5] rounded-lg' />
                    <div className='w-[250px] h-[20px] bg-[#F5F5F5] rounded-lg' />
                </div>
            </div>
            <div className='flex gap-2 mt-4'>
                <div className='w-1/2 h-[45px] bg-[#F5F5F5] border border-[#cecece] text-center rounded-lg flex items-center justify-center text-[#cecece]'>Deny</div>
                <div className='w-1/2 h-[45px] bg-[#EAF5FF] border border-[#00529C] text-center rounded-lg flex items-center justify-center text-[#00529C]'>Allow</div>
            </div>
        </div>
    </div>
);

// Komponen Kamera Capture
const CameraCapture = ({ onCapture, setErrorType, onStopStream }) => {
    const videoRef = useRef(null);
    const streamRef = useRef(null);

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then((stream) => {
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setErrorType(null);
            })
            .catch((err) => {
                if (err.name === 'NotAllowedError') setErrorType('NotAllowedError');
                else setErrorType('GeneralError');
            });

        return () => {
            streamRef.current?.getTracks().forEach(track => track.stop());
        };
    }, []);

    const handleCapture = () => {
        if (!videoRef.current) return;
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth || 640;
        canvas.height = videoRef.current.videoHeight || 480;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imgData = canvas.toDataURL('image/png');

        // stop webcam immediately after capture
        streamRef.current?.getTracks().forEach(track => track.stop());
        onStopStream?.();
        onCapture(imgData);
    };

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full border scale-x-[-1]"
            />
            <div className="flex justify-center p-4">
                <div className="bg-[#00529C] w-[60px] h-[60px] flex items-center justify-center rounded-full py-[2px] px-[1px]">
                    <button
                        onClick={handleCapture}
                        className="border-solid border-[#ffffff] border-[2px] bg-[#00529C] text-white hover:bg-[#003f7f] w-full h-full ms-[1px] mb-[1px] rounded-full cursor-pointer"
                    />
                </div>
            </div>
        </>
    );
};

// Preview hasil foto
const CapturedImagePreview = ({ imageData, onRetake, onConfirm }) => (
    <>
        <div className="flex justify-center p-4">
            <img
                src={imageData}
                alt="Captured"
                className="w-full h-auto max-w-[100%] max-h-[400px] object-cover rounded-lg scale-x-[-1]"
            />
        </div>
        <div className="flex justify-center gap-4 p-4">
            <ButtonDefault
                sx={{ padding: "6px 24px" }}
                model="outlined"
                color="#00529C"
                type="button"
                onClick={onRetake}
            >
                Ambil Ulang
            </ButtonDefault>
            <ButtonDefault
                sx={{ padding: "6px 24px" }}
                model="fill"
                color="#00529C"
                type="button"
                onClick={onConfirm}
            >
                Gunakan Foto
            </ButtonDefault>
        </div>
    </>
);

// UI Jika error permission
const PermissionsInfo = ({ errorType }) => (
    <>
        <PermissionsComponent />
        <p className="font-bold text-center mt-6 mb-3">
            {errorType === 'NotAllowedError' ? "Mohon Izinkan Akses Kamera" : "Gagal mengakses webcam"}
        </p>
        <p className="text-center mb-8">
            {errorType === 'NotAllowedError'
                ? "Izinkan browser mengakses kamera untuk melanjutkan proses berikut."
                : "Silakan coba lagi atau periksa perangkat kamera Anda."}
        </p>
    </>
);

// Komponen utama dialog
const WebcamDialog = ({ toggle, handleClose, callbackImageData, title="Ambil Bukti Kehadiran Debitur" }) => {
    const [imageData, setImageData] = useState(null);
    const [errorType, setErrorType] = useState(null);

    const resetWebcam = () => {
        setImageData(null);
        setErrorType(null);
    };

    const handleCapture = (imgData) => {
        setImageData(imgData);
    };

    const handleConfirm = () => {
        callbackImageData(imageData);
        resetWebcam();
        handleClose();
    };

    useEffect(() => {
        if (!toggle) resetWebcam();
    }, [toggle]);

    return (
        <Dialog open={toggle} fullWidth keepMounted>
            <div className="flex justify-between items-center p-4">
                <div className="font-semibold text-lg">{title}</div>
                <IconButton onClick={() => {
                    resetWebcam();
                    handleClose();
                }}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="p-0">
                {toggle && (
                    imageData ? (
                        <CapturedImagePreview
                            imageData={imageData}
                            onRetake={resetWebcam}
                            onConfirm={handleConfirm}
                        />
                    ) : errorType ? (
                        <PermissionsInfo errorType={errorType} />
                    ) : (
                        <CameraCapture
                            onCapture={handleCapture}
                            setErrorType={setErrorType}
                        />
                    )
                )}
            </div>
        </Dialog>
    );
};

export default WebcamDialog;
