import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { storage } from "../firebase/config";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import marcoImage from "../images/Marco-digital-2 1.png";
import background from "../images/background.png";
import retake from "../images/Group 218.png";

const PhotoCam = () => {
  const webcamRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const navigate = useNavigate();
  const cameraRef = useRef(null);

  const uploadToFirebase = async (base64Image) => {
    try {
      const storageRef = ref(storage, `images/${Date.now()}.jpg`);
      await uploadString(storageRef, base64Image, "data_url");
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
      console.log("Image URL:", url);
      return url;
    } catch (error) {
      console.error("Error uploading image to Firebase", error);
    }
  };

  const capture = useCallback(() => {
    if (cameraRef.current) {
      html2canvas(cameraRef.current).then((canvas) => {
        const finalImage = canvas.toDataURL("image/jpeg");
        setCapturedImage(finalImage);
        uploadToFirebase(finalImage);
      });
    }
  }, [cameraRef]);

  useEffect(() => {
    if (isCameraReady && timeLeft === 0) {
      capture();
    } else if (isCameraReady && timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [isCameraReady, timeLeft, capture]);

  useEffect(() => {
    const checkCameraReady = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraReady(true);
      } catch (error) {
        setIsCameraReady(false);
      }
    };

    checkCameraReady();
  }, []);

  const retakePhoto = () => {
    setCapturedImage(null);
    setImageUrl(null);
    setTimeLeft(5);
  };

  const handlerNext = () => {
    navigate("/register", { state: { image: imageUrl } });
  };

  return (
    <div className="relative w-screen h-screen">
      {!isCameraReady && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="text-xl font-bold text-gray-700 bg-gray-200 p-4 rounded-md shadow-md">
            Loading...
          </div>
        </div>
      )}
      <div
        className={`relative flex flex-col items-center p-6 w-full h-full border rounded-md shadow-md ${
          !isCameraReady ? "opacity-0" : ""
        }`}
        ref={cameraRef}
      >
        {isCameraReady && !capturedImage && (
          <>
            <div className="relative w-full h-full">
              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
              <img
                src={marcoImage}
                alt="Marco"
                className="absolute top-0 left-0 w-full h-full object-cover"
              />
            </div>
          </>
        )}
        {capturedImage && (
  <div className="relative flex flex-col items-center">
    <img src={capturedImage} alt="Captura" className="mb-4 w-full h-full object-cover" />
    <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 flex justify-between w-1/2 max-w-md space-x-4 ">
      <img
        src={retake}
        alt="Recap"
        className="w-16 cursor-pointer"
        onClick={retakePhoto}
      />
      <button
        onClick={handlerNext}
        className="px-4 py-2 rounded-md shadow-sm text-sm font-medium text-white bg-green-600"
      >
        Next
      </button>
    </div>
  </div>
)}
        <div>
          {timeLeft > 0 && (
            <div className="text-3xl font-bold mb-4">{timeLeft}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhotoCam;
