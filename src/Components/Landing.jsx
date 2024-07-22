
import { useNavigate } from 'react-router-dom';
import background from "../images/background.png";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handlerClic = () => {
    navigate("/Photo");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}>
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Welcome Take a Pic</h1>
        <button onClick={handlerClic} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    </div>
  );
};

export default WelcomePage;