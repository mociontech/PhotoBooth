import { useState, useRef, useEffect } from "react";
import { Camera, CameraType } from "react-camera-pro";

interface Props {
  countdownStart: number;
  frameSrc: string;
  onPhotoTaken: (photo: string) => void;
}

const ResponsiveCamera = ({
  countdownStart,
  frameSrc,
  onPhotoTaken,
}: Props) => {
  const [countdown, setCountdown] = useState(countdownStart);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    if (countdown <= 0) {
      setIsCapturing(false);
      takePhoto();
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const cameraRef = useRef<CameraType>(null); // Referencia a la cámara
  const [image, setImage] = useState<null | string>(null); // Estado para guardar la foto

  // Función para tomar una foto
  const takePhoto = () => {
    if (cameraRef.current) {
      const photo = cameraRef.current.takePhoto();
      onPhotoTaken(photo.toString());
      setImage(photo.toString()); // Guarda la foto en el estado
    }
  };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* Contenedor de la cámara */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Camera
          ref={cameraRef}
          facingMode="environment"
          aspectRatio={"cover"}
          errorMessages={{}}
        />
        {frameSrc && (
          <img
            width={2000}
            height={2000}
            src={frameSrc}
            alt="Marco"
            className="absolute w-screen h-screen pointer-events-none z-[1000]"
          />
        )}
        {isCapturing && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-5xl font-bold">
            {countdown}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResponsiveCamera;
