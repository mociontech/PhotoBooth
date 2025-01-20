import { useRoutes, BrowserRouter } from "react-router-dom";
import WelcomePage from "./pages/Landing";
import PhotoCam from "./pages/PhotoCam";
import Register from "./pages/Register";

function AppRoutes() {
  const routes = useRoutes([
    { path: "/", element: <WelcomePage /> },
    { path: "/PhotoCam", element: <PhotoCam /> },
    { path: "/register", element: <Register /> },
  ]);
  return routes;
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
