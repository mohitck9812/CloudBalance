import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import Loading from "../loading/Loading";

const ProtectedRoute = ({ children, allowedRole}) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  if (loading) return <Loading />;

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if(allowedRole && !allowedRole.includes(user?.role.id)){
    return <Navigate to="/cost-explorer" replace/>
  }

  return children;
};

export default ProtectedRoute;
