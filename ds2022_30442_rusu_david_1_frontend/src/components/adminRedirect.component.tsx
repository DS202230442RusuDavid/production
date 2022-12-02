import { Navigate, Outlet } from "react-router-dom";
import { getLoggedInUser } from "../services/user.service";

const AdminRoute = () => {
    const loggedInUser = getLoggedInUser();
    if (loggedInUser.role !== 'Admin') {
      return <Navigate to={'/home'} replace />;
    }
    return <Outlet />;
  };

export default AdminRoute;