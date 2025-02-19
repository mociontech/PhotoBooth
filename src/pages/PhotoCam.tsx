import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Camera from "../Components/ResponsiveCamera";
import { useImage } from "../hooks/useImage";

export default function PhotoCam() {
  const [photo, setPhoto] = useState<string | null>("");
  const { setImage } = useImage();
  const navigate = useNavigate();

  function handlePhotoTaken(photo: string) {
    setPhoto(photo);
    setImage(photo);
  }

  function nextPage() {
    navigate("/register");
  }

  return (
    <div className="relative w-screen h-screen">
      {!photo ? (
        <Camera
          countdownStart={5}
          frameSrc={"/marco.png"}
          onPhotoTaken={handlePhotoTaken}
        />
      ) : (
        <div>
          <img src={photo} alt="" width={2000} />
          <button
            className="absolute w-[130px] bottom-[70px] left-[130px]"
            onClick={() => {
              setPhoto(null);
            }}
          >
            <img src="/back.svg" alt="" />
          </button>
          <button
            className="absolute w-[130px] bottom-[70px] right-[130px]"
            onClick={nextPage}
          >
            <img src="/next.svg" alt="" />
          </button>
        </div>
      )}
    </div>
  );
}
