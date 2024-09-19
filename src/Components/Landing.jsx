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
          <button className="relative w-[80%] mt-[700px]"  onClick={handlerClic} >
          <img src={button} alt="button" className="w-full"  />
          <span className="absolute inset-0 flex   text-6xl   items-center justify-center">Comenzar</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
