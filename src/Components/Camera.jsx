"use client";

import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";

export default function Camera({
  countdownStart = 5,
  frameSrc,
  horizontal = false,
  onlyPhoto = false,
  onPhotoTaken,
}) {
  const webcamRef = useRef(null);
  const [isPhotoTaken, setIsPhotoTaken] = useState(null);
  const [countdown, setCountdown] = useState(countdownStart);
  const [isCapturing, setIsCapturing] = useState(true);

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setIsCapturing(false);
      capturePhoto();
    }
    return () => {
      clearTimeout(timer);
    };
  }, [countdown]);

  const capturePhoto = async () => {
    const webcamSS = webcamRef.current?.getScreenshot();

    if (webcamSS) {
      const webcamImage = new Image();
      webcamImage.src = webcamSS;

      webcamImage.onload = () => {
        const finalCanvas = document.createElement("canvas");
        const ctx = finalCanvas.getContext("2d");

        finalCanvas.width = window.innerWidth;
        finalCanvas.height = window.innerHeight;

        ctx.save();
        if (!horizontal) {
          ctx.rotate((-90 * Math.PI) / 180);
          ctx.scale(-1, 1);
          ctx.drawImage(
            webcamImage,
            0,
            0,
            finalCanvas.height,
            finalCanvas.width
          );
        } else {
          ctx.scale(-1, 1);
          ctx.drawImage(
            webcamImage,
            -1920,
            0,
            finalCanvas.width,
            finalCanvas.height
          );
        }
        ctx.restore();

        if (frameSrc && !onlyPhoto) {
          const frameImage = new Image();
          frameImage.src = frameSrc;
          frameImage.onload = () => {
            ctx.drawImage(
              frameImage,
              0,
              0,
              finalCanvas.width,
              finalCanvas.height
            );

            const imageData = finalCanvas.toDataURL("image/png");
            setIsPhotoTaken(true);
            onPhotoTaken?.(imageData);
          };
        } else {
          const imageData = finalCanvas.toDataURL("image/png");
          setIsPhotoTaken(true);
          onPhotoTaken?.(imageData);
        }
      };
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center`}>
      {!isPhotoTaken && (
        <div className="relative w-screen h-screen overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <Webcam
              className={`absolute object-fit object-center ${
                horizontal
                  ? `scale-x-[-1] h-auto min-w-[1920px]`
                  : `rotate-90 transform scale-y-[-1] top-[420px] -left-[420px] h-auto min-w-[1920px]`
              }`}
              ref={webcamRef}
              videoConstraints={{
                height: 1920,
                aspectRatio: 16 / 9,
              }}
            />
          </div>
          {frameSrc && (
            <img
              src={frameSrc}
              alt="Marco"
              className="absolute top-0 left-0 w-full h-full pointer-events-none"
            />
          )}
          {isCapturing && (
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-white text-5xl font-bold">
              {countdown}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
