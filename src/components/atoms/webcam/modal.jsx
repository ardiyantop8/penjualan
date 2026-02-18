import { useEffect, useRef, useState } from 'react';
import { Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ButtonDefault } from '../buttons/default';

const PermissionsComponent = () => (
    <div className='py-[80px] bg-[#F5F5F5] flex flex-col items-center'>
        <div className='w-[348px] h-[164px] border-black border-[3px] p-[16px] rounded-2xl mx-auto bg-white flex flex-col justify-between'>
            <div className='flex flex-col'>
                <div className='w-[130px] h-[20px] bg-[#F5F5F5] mb-3 rounded-lg'/>
                <div className='flex gap-2'>
                    <div className='w-[20px] h-[20px] bg-[#F5F5F5] rounded-lg'/>
                    <div className='w-[250px] h-[20px] bg-[#F5F5F5] rounded-lg'/>
                </div>
            </div>
            <div className='flex gap-2 mt-4'>
                <div className='w-1/2 h-[45px] bg-[#F5F5F5] border border-[#cecece] text-center rounded-lg flex items-center justify-center text-[#cecece]'>Deny</div>
                <div className='w-1/2 h-[45px] bg-[#EAF5FF] border-solid border-[1px] border-[#00529C] text-center rounded-lg flex items-center justify-center text-[#00529C]'>Allow</div>
            </div>
        </div>
    </div>
);

const WebcamDialog = ({ toggle, handleClose }) => {
    const videoRef = useRef(null);
    const [toggleWebcam, setToggleWebcam] = useState(toggle);
    const [errorType, setErrorType] = useState(null);
    const [streamAvailable, setStreamAvailable] = useState(false);
    const [imageData, setImageData] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);

    useEffect(() => {
        if (toggle) {
            setToggleWebcam(true);
            navigator.mediaDevices.getUserMedia({ video: true })
                .then((stream) => {
                    setMediaStream(stream);
                    setErrorType(null);
                    setStreamAvailable(true);
                })
                .catch((err) => {
                    setMediaStream(null);
                    setStreamAvailable(false);
                    if (err.name === 'NotAllowedError') setErrorType('NotAllowedError');
                    else setErrorType('GeneralError');
                });
        } else {
            if (mediaStream) {
                setToggleWebcam(false);
                mediaStream.getTracks().forEach(track => track.stop());
            }
        }

        return () => {
            if (mediaStream) {
                mediaStream.getTracks().forEach(track => track.stop());
            }
            setToggleWebcam(false);
            setMediaStream(null);
            setErrorType(null);
            setStreamAvailable(false);
        };
    }, [toggle]);

    useEffect(() => {
        if (videoRef.current && mediaStream) {
            videoRef.current.srcObject = mediaStream;
        }
    }, [videoRef, mediaStream]);

    const handleShutterPhoto = () => {
        if (videoRef.current && mediaStream) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth || 640;
            canvas.height = videoRef.current.videoHeight || 480;
            const context = canvas.getContext('2d');
            context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
            const imgData = canvas.toDataURL('image/png');
            setImageData(imgData);

            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
    };

    const ComponentsWebcam = () => {
        if (imageData) {
            return (
                <>
                    <div className="flex justify-center p-4">
                        <img src={imageData} alt="Captured" className="w-full h-auto max-w-[100%] max-h-[400px] object-cover rounded-lg" />
                    </div>
                    <div className="flex justify-center gap-4 p-4">
                        <ButtonDefault
                            sx={{ padding: "6px 24px" }}
                            model="outlined"
                            color="#00529C"
                            type="button"
                            onClick={() => {
                                setToggleWebcam(true);
                                setImageData(null);
                                mediaStream.getTracks().forEach(track => track.start());
                            }}
                        >
                            Ambil ulang
                        </ButtonDefault>
                        <ButtonDefault
                            sx={{ padding: "6px 24px" }}
                            model="fill"
                            color="#00529C"
                            type="button"
                            onClick={handleClose}
                        >
                            Gunakan Foto
                        </ButtonDefault>
                    </div>
                </>
            );
        }

        if (errorType === 'NotAllowedError') {
            return (
                <>
                    <PermissionsComponent />
                    <p className="font-bold text-center mt-6 mb-3">Mohon Izinkan Akses Kamera</p>
                    <p className="text-center mb-8">Izinkan browser mengakses kamera untuk melanjutkan proses berikut.</p>
                </>
            );
        }

        if (errorType === 'GeneralError') {
            return <p className="text-red-600 text-center">Gagal mengakses webcam. Silakan coba lagi.</p>;
        }

        if (streamAvailable) {
            return (
                <>
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full border scale-x-[-1]"
                    />
                    <div className="flex justify-center p-4">
                        <div className="border-[#00529C] border-solid bg-[#ffffff] border-[1px] w-[60px] h-[60px] flex items-center justify-center rounded-full">
                            <button
                                onClick={handleShutterPhoto}
                                className="bg-[#00529C] text-white hover:bg-[#003f7f] border-none w-[55px] h-[54px] flex items-center justify-center rounded-full cursor-pointer"
                            />
                        </div>
                    </div>
                </>
            );
        }

        return (
            <>
                <PermissionsComponent />
                <p className="font-bold text-center mt-6 mb-3">Mohon Izinkan Akses Kamera</p>
                <p className="text-center mb-8">Izinkan browser mengakses kamera untuk melanjutkan proses berikut.</p>
            </>
        );
    };

    return (
        <Dialog open={toggle} fullWidth keepMounted>
            <div className='flex justify-between items-center p-4'>
                <div className="font-semibold text-lg">Ambil Bukti Kehadiran Debitur</div>
                <IconButton onClick={handleClose}>
                    <CloseIcon />
                </IconButton>
            </div>
            <div className="p-0">
                <ComponentsWebcam />
            </div>
        </Dialog>
    );
};

export default WebcamDialog;
