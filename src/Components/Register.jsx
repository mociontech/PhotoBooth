import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import registerback from "../images/Group 221.png";
import icononame from "../images/Group 178.png";
import iconemail from "../images/icon.png";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const capturedImage = location.state?.image || "";
  console.log("Received captured image:", capturedImage);

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
    navigate("/");
    console.log("Correo:", email);
    console.log("Nombre:", name);

    if (capturedImage) {
      await axios.post("https://devapi.evius.co/api/correos-mocion", {
        email: email,
        html: `<img src="${capturedImage}" alt="Captura de cámara"/>`,
        subject: "PhotoOportunity",
        by: "PhotoOportunity RD",
      });
      console.log("foto", capturedImage);
      console.log("Email sent");
    }

    const newUniqueId = Math.random().toString(36).substring(7);
    const newHashId = 'RD-Photo-Booth-' + newUniqueId;
    const url = `https://mocionws.info/dbController.php?method=newRecordExclude&table=leads&name=${name}&email=${email}&uniqueId=${newHashId}&experience=1`;
    await axios.get(url);

  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${registerback})` }}
    >
      <form className="p-8 rounded-lg shadow-md w-full max-w-md mt-12">
        <div>
          <div className="flex items-center border mb-4 w-full px-4 py-2 rounded-xl bg-white bg-opacity-10">
            <img src={icononame} alt="Icono Nombre" className="w-5 h-5 mr-2" />
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nombre"
              className={`w-full bg-transparent border-none focus:outline-none ${
                name ? "text-white" : ""
              }`}
            />
          </div>
          <div className="flex items-center border mb-4 w-full px-4 py-2 rounded-xl bg-white bg-opacity-10">
            <img src={iconemail} alt="Icono Correo" className="w-5 h-5 mr-2" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo"
              className={`w-full bg-transparent border-none focus:outline-none ${
                email ? "text-white" : ""
              }`}
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRegister}
            className="py-2 px-4 border border-transparent rounded-xl shadow-sm text-xl w-80 font-bold text-white bg-[#06ADBF]"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
