import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import registerback from "../images/login.webp";
import icononame from "../images/Group 178.png";
import iconemail from "../images/icon.png";
//import { register } from "../firebase/db";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const capturedImage = location.state?.image || "";
  console.log("Received captured :", capturedImage);

  useEffect(() => {
    if (localStorage.getItem("isReloaded")) {
      navigate("/");
    } else {
      localStorage.setItem("isReloaded", true);
    }

    return () => {
      localStorage.removeItem("isReloaded");
    };
  }, [navigate]);

  const handleRegister = async () => {
    //await register(name, email);
    console.log("Correo:", email);
    console.log("Nombre:", name);

    if (capturedImage) {
      await axios.post("https://devapi.evius.co/api/correos-mocion", {
        email: email,
        html: `<img src="${capturedImage}" alt="Captura de cámara"/>`,
        subject: "PhotoBooth The Band",
        by: "photoboothTheBand",
      });
      console.log("foto", capturedImage);
      console.log("Email sent");
    }

    window.location.href = "https://landing-ochre-gamma.vercel.app/";
  };

  return (
    <div
      className=" flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${registerback})` }}
    >
      <form className="p-8 rounded-lg shadow-md w-full max-w-md mt-12">
        <div>
          <div className="flex items-center ml-[-90px] border mb-8 w-[160%] h-[80px] px-4 py-2 rounded-xl bg-white bg-opacity-10">
            <img src={icononame} alt="Icono Nombre" className="w-7 h-7 mr-2" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              autoComplete="off"
              className={`w-full text-4xl bg-transparent border-none focus:outline-none ${
                name ? "text-white" : ""
              }`}
            />
          </div>
          <div className="flex items-center ml-[-90px]  w-[160%] h-[80px] border mb-16  px-4 py-2 rounded-xl bg-white bg-opacity-10">
            <img src={iconemail} alt="Icono Correo" className="w-7 h-7 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              autoComplete="off"
              className={`w-full text-4xl bg-transparent border-none focus:outline-none ${
                email ? "text-white" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex justify-center w-full">
          <button
            type="button"
            onClick={handleRegister}
            className="py-2 px-4  text-5xl border ml-[20px] border-transparent rounded-xl shadow-sm  w-[850px] h-[100px]  font-bold text-white bg-[#e74428]"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
