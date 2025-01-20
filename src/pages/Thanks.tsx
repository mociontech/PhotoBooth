import React, { useEffect } from "react";
import thanks from "../images/Envío de Foto (2).png";

const Thanks = () => {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = "https://landing-ochre-gamma.vercel.app/";
    }, 3000);

    // Limpiar el timeout cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative flex justify-center items-center h-screen">
      <img src={thanks} alt="Thank you" className="max-w-full h-auto" />
      <h1 className="absolute text-white text-5xl font-bold text-center">
        ¡Gracias por participar!
      </h1>
    </div>
  );
};

export default Thanks;
