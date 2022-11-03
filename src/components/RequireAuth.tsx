import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../context/authContext";
const RequireAuth = () => {
  const { isLogin } = useAuthContext();
  const location = useLocation();

  return isLogin ? (
    <Outlet></Outlet>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace></Navigate>
  );
};

export default RequireAuth;
