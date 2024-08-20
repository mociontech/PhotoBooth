import { useState, useEffect, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import { storage } from "../firebase/config";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import marcoImage from "../images/Marco-digital-2 1.png";
import background from "../images/background.png";
import retake from "../images/Group 218.png";
import next from "../images/Group 194.png";
import cero from "../images/0.png";
import uno from "../images/1.png";
import dos from "../images/2.png";
import tres from "../images/3.png";
import cuatro from "../images/4.png";
import cinco from "../images/5.png";
import preparate from "../images/¡PREPÁRATE PARA LA FOTO!.png";
import loading from "../images/loading.gif"

// Create a mapping from numbers to image sources
const numberToImage = {
  0: cero,
  1: uno,
  2: dos,
  3: tres,
  4: cuatro,
  5: cinco,
};

const PhotoCam = () => {
  const webcamRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
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
      html2canvas(cameraRef.current, {
        useCORS: true,
      }).then((canvas) => {
        // Convert the canvas to a data URL
        const finalImage = canvas.toDataURL("image/jpeg");
        setCapturedImage(finalImage);
        uploadToFirebase(finalImage);
      });
    }
  }, [cameraRef]);
  

  useEffect(() => {
    let timerId;
    if (isCameraReady && timeLeft === 0) {
      capture();
    } else if (isCameraReady && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isCameraReady) {
      setTimeLeft(5);
    }

    return () => clearInterval(timerId);
  }, [isCameraReady, timeLeft, capture]);

  useEffect(() => {
    const checkCameraReady = async () => {
      try {
        await navigator.mediaDevices.getUserMedia({ video: true });
        setIsCameraReady(true);
        setIsLoading(false);
      } catch (error) {
        setIsCameraReady(false);
        setIsLoading(false);
      }
    };

    checkCameraReady();
  }, []);

  const retakePhoto = () => {
    setCapturedImage(null);
    setImageUrl(null);
    setIsCameraReady(false);
    setIsLoading(true);
    setTimeLeft(5);
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(() => setIsCameraReady(true))
      .catch(() => setIsCameraReady(false))
      .finally(() => setIsLoading(false));
  };

  const handlerNext = () => {
    navigate("/register", { state: { image: imageUrl } });
  };

  return (
    <div className="relative w-screen h-screen">
      {isLoading && (
        <div
          className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${background})` }}
        >
          <img
                src={loading}
                alt="Marco"
                className="w-28 h-28"
              />
        </div>
      )}
      <div
        className={`relative flex flex-col border rounded-md shadow-md ${
          !isCameraReady ? "opacity-0" : ""
        }`}
        ref={cameraRef}
      >
        {isCameraReady && !capturedImage && (
          <>
            <div className="relative w-screen h-screen">
              <div className="absolute top-0 left-0 w-screen h-screen transform scale-x-[-1]">

              <Webcam
                audio={false}
                ref={webcamRef}
                screenshotFormat="image/jpeg"
                className="w-screen h-screen object-cover"
              />
              </div>
              <img
                src={marcoImage}
                alt="Marco"
                className="absolute top-0 left-0 w-screen h-screen object-cover"
              />
              {timeLeft > 0 && (
                <div className="absolute top-[100px] left-1/2 transform -translate-x-1/2 flex flex-col items-center">
                  {timeLeft > 0 && (
                    <img
                      src={preparate}
                      alt="Preparación"
                      className="w-64 h-auto"
                    />
                  )}
                  <div className="flex">
                    {Array.from(String(timeLeft)).map((digit, index) => (
                      <img
                        key={index}
                        src={numberToImage[digit]}
                        alt={`Countdown ${digit}`}
                        className="w-32 h-32 object-cover mt-36"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
        {capturedImage && (
          <div className="relative flex flex-col items-center top-0 left-0 w-full h-full object-cover">
            <img
              src={capturedImage}
              alt="Captura"
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-28 left-1/2 transform -translate-x-1/2 flex justify-center w-1/2 max-w-md space-x-4">
              <div className="flex flex-col items-center">
                <img
                  src={retake}
                  alt="Recap"
                  className="w-16 cursor-pointer"
                  onClick={retakePhoto}
                />
                <span className="text-sm text-white">Repetir</span>
              </div>
              <div className="flex flex-col items-center">
                <img
                  src={next}
                  alt="Recap"
                  className="w-16 cursor-pointer"
                  onClick={handlerNext}
                />
                <span className="text-sm text-white">Siguiente</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoCam;
