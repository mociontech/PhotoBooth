import React from "react";
import Webcam from "react-webcam";

const PhotoCam = () => {
  const webcamRef = React.useRef(null);

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    console.log(imageSrc); // Aquí puedes manejar la imagen capturada
  }, [webcamRef]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center p-6 bg-white border rounded-md shadow-md">
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
      </div>
    </div>
  );
};

export default PhotoCam;
