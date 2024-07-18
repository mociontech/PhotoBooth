import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const PhotoCam = () => {
  const webcamRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const navigate = useNavigate(); 

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      console.log(imageSrc); // Aquí puedes manejar la imagen capturada
      setTimeout(() => {
        navigate('/register'); // Redirigir a la ruta /register
      }, 3000);
    
    }
  }, [webcamRef]);

  useEffect(() => {
    if (timeLeft === 0) {
      capture();
    } else {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [timeLeft, capture]);

  useEffect(() => {
    const checkCameraReady = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraReady(true);
        console.log("La cámara está activa");
      } catch (error) {
        setIsCameraReady(false);
        console.log("La cámara NO está activa", error);
      }
    };

    checkCameraReady();
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen">
      {!isCameraReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 bg-opacity-80">
          <div className="text-xl font-bold text-gray-700 bg-gray-200 p-4 rounded-md shadow-md">
            Loading...
          </div>
        </div>
      )}
      <div className={`flex flex-col items-center p-6 bg-white border rounded-md shadow-md ${!isCameraReady ? 'opacity-0' : ''}`}>
        {isCameraReady && (
          <>
            <h1 className="text-2xl font-bold mb-4">Photo</h1>
            <Webcam
              audio={false}
              ref={webcamRef}
              screenshotFormat="image/jpeg"
              className="mb-4"
            />
            <button
              onClick={capture}
              className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Capturar Foto
            </button>
          </>
        )}
        <div className="text-3xl font-bold mb-4">{timeLeft}</div>
      </div>
    </div>
  );
};

export default PhotoCam;
