import { useNavigate } from "react-router-dom";
import background from "/welcome.webp";

export default function WelcomePage() {
  const navigate = useNavigate();

  function nextPage() {
    navigate("/PhotoCam");
  }

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="text-center text-white text-xl font-bold">
          <button
            className="flex justify-center items-center w-[500px] h-[50px] mt-[450px] py-[50px] bg-[#e9452b]"
            onClick={nextPage}
          >
            <span className=" flex text-6xl items-center justify-center">
              Comenzar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
