import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import Route from "./route/Route.jsx";
// import DummyDataProvider from "./context/DummyData.jsx";
// import AuthData from "./context/AuthData.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadAuthFromStorage } from "./store/auth/auth.actions";
import { Provider } from "react-redux";
import store from "./store";

function ReduxBootstrap({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadAuthFromStorage());
  }, [dispatch]);

  return children;
}


function Root() {
  
  return (
    <StrictMode>
      <Provider store={store}>
        <ReduxBootstrap>
        {/* <DummyDataProvider> */}
          {/* <AuthData> */}
            <Route />
            <ToastContainer
              position="top-right"
              newestOnTop
              closeOnClick
              pauseOnHover
              draggable
              theme="light"
            />
          {/* </AuthData>
        </DummyDataProvider> */}
        </ReduxBootstrap>
      </Provider>
    </StrictMode>
  );
}

export default Root;

createRoot(document.getElementById("root")).render(<Root />);
