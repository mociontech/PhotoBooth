import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the page is reloaded
    if (sessionStorage.getItem('isReloaded')) {
      navigate("/");
    } else {
      // Set flag for reload
      sessionStorage.setItem('isReloaded', true);
    }

    // Clean up flag on component unmount
    return () => {
      sessionStorage.removeItem('isReloaded');
    };
  }, [navigate]);

  const handleRegister = () => {
    console.log("Correo:", email);
    console.log("Nombre:", name);
    navigate("/photo");
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
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
