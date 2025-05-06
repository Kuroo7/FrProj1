import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../../context/UserContext";

const AdminProtectedRoute = ({ children }) => {
  const { user, loading } = useUser();
  

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role!=="admin") {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
};

export default AdminProtectedRoute;
