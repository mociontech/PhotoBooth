
import { useNavigate } from 'react-router-dom';


const WelcomePage = () => {
  const navigate = useNavigate();

 

  const handlerClic =()=>{
    navigate("/Photo")
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome Take a Pic</h1>
        <button onClick={handlerClic} className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
      </div>
    </div>
  );
};

export default WelcomePage;