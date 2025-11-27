import { StrictMode} from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Route from "./route/Route.jsx";
import DummyDataProvider from "./context/DummyData.jsx";
import AuthData from "./context/AuthData.jsx";

function Root() {


  return (
    <StrictMode>
      <DummyDataProvider>
      <AuthData>
        <Route />
      </AuthData>
      </DummyDataProvider>
    </StrictMode>
  );
}

export default Root;

createRoot(document.getElementById("root")).render(<Root />);
