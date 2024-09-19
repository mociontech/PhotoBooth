import { useRoutes, BrowserRouter} from "react-router-dom";
import Register from "./Components/Register";
import PhotoCam from "./Components/PhotoCam";
import Landingin from "./Components/Landing";
import Thanks from "./Components/Thanks";
import "./App.css";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/", element: <Landingin /> },
    { path: "/Photo", element: <PhotoCam /> },
    { path: "/register", element: <Register /> },
    { path: "/thanks", element: <Thanks /> },
    
  ]);
  return routes;
};

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
