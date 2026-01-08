import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Route from "./route/Route.jsx";
import DummyDataProvider from "./context/DummyData.jsx";
import AuthData from "./context/AuthData.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Root() {

  return (
    <StrictMode>
      <DummyDataProvider>
      <AuthData>
        <Route />
         <ToastContainer
            position="top-right"
            newestOnTop
            closeOnClick
            pauseOnHover
            draggable
            theme="light"
          />
      </AuthData>
      </DummyDataProvider>
    </StrictMode>
  );
}

export default Root;

createRoot(document.getElementById("root")).render(<Root />);
