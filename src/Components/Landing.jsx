
import { useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  const navigate = useNavigate();

  const handrerClic =()=>{
    navigate("/Photo")
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Take a Pic</h1>
        <button onClick={handrerClic} className="px-4 py-2 bg-blue-500 text-white rounded">Siguiente</button>
      </div>
    </div>
  );
};

export default WelcomePage;
