import { useNavigate } from "react-router-dom";
import background from "../images/background.png";
import button from "../images/Rectangle 4.png"


const WelcomePage = () => {
  const navigate = useNavigate();

  const handlerClic = () => {
    navigate("/Photo");
  };

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="text-center text-white text-xl font-bold">
          <button
            className="flex justify-center items-center w-[500px] h-[50px] mt-[450px] py-[50px] bg-[#e9452b]"
            onClick={handlerClic}
          >
            <span className=" flex text-6xl items-center justify-center">
              Comenzar
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
