import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInUser } from "../services/user.service";

const ProtectedRoute = () => {
    const loggedInUser = getLoggedInUser();
    if (!loggedInUser.id) {
      return <Navigate to={'/login'} replace />;
    }
    return <Outlet />;
  };

export default ProtectedRoute;