import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const IsAuthenticated = ({ children }) => {
  const { isAuthenticated, loading } = useSelector(
    (state) => state.auth
  );

  if (loading) return ;

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }


  return children;
};

export default IsAuthenticated;
