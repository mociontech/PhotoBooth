import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const capturedImage = location.state?.image || "";
  console.log("Received captured image:", capturedImage);

  useEffect(() => {
    if (localStorage.getItem('isReloaded')) {
      navigate("/");
    } else {
      localStorage.setItem('isReloaded', true);
    }

    return () => {
      localStorage.removeItem('isReloaded');
    };
  }, [navigate]);

  const handleRegister = async () => {
    console.log("Correo:", email);
    console.log("Nombre:", name);

    if (capturedImage) {
      await axios.post("https://devapi.evius.co/api/correos-mocion", {
        email: email,
        html: `<img src="${capturedImage}" alt="Captura de cámara"/>`,
        subject: "PhotoOportunity",
        by: "PhotoOportunity RD📸",
      });
      console.log("foto", capturedImage);
      console.log("Email sent");
    }

    navigate("/");
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form>
        <div>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            className="border mb-4"
          />
        </div>
        <div>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre"
            className="border mb-4"
          />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRegister}
            className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Send pic
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
