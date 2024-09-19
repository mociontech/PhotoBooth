import { useRoutes, BrowserRouter } from "react-router-dom";
import Register from "./Components/Register";
import PhotoCam from "./Components/PhotoCam";
import Landingin from "./Components/Landing";
import "./App.css";

const AppRoutes = () => {
  const routes = useRoutes([
    { path: "/landing", element: <Landingin /> },
    { path: "/Photo", element: <PhotoCam /> },
    { path: "/register", element: <Register /> },
    { path: "*", element: <Landingin />},
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
