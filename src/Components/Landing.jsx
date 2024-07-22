import { useNavigate } from "react-router-dom";
import background from "../images/background.png";
import Logo from "../images/Group 2.png";
import takePic from "../images/Capa_1.png";
import rayo2 from "../images/rayo2.png";
import numbers from "../images/¡3,2,1..!.png";
import parrafo from "../images/parrafo.png";
import button from "../images/Rectangle 4.png"
//import begin from "../images/Comenzar.png"
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
        <div className="absolute mt-[-582px] w-44">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="absolute mt-[-200px] w-72">
          <img src={takePic} alt="take" />
        </div>
        <div className="absolute mt-[-180px] ml-[322px] w-8">
          <img src={rayo2} alt="rayo" />
        </div>
        <div className="absolute mt-[-20px] w-24">
          <img src={numbers} alt="conteo" />
        </div>
        <div className="absolute mt-[80px] w-80">
          <img src={parrafo} alt="parrafo" />
        </div>
        <div className="text-center text-white text-xl font-bold">
          <button className="relative w-80 mt-[280px]"  onClick={handlerClic} >
          <img src={button} alt="button" className="w-full"  />
          <span className="absolute inset-0 flex items-center justify-center">Comenzar</span>
          </button>
          {/* <button
            onClick={handlerClic}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Next
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
