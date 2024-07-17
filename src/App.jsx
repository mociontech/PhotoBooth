
import { useRoutes, BrowserRouter } from "react-router-dom";
import Register from "./Components/Register";
import PhotoCam from "./Components/PhotoCam";



import "./App.css";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/registrate", element: <Register/> },
    { path: "/Photo", element: <PhotoCam/> },
 
   
  
  ]);
  return routes;
};

function App() {
  
  

  return (
    <BrowserRouter>
      <AppRoutes  />
    </BrowserRouter>
  );
}

export default App;
