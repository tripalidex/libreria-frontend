import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../../../hooks/useAuth";

const RequiredAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth.user);
    return(
        allowedRoles.includes(auth?.rol)
            ? <Outlet />
            : <Navigate to="/unauthorized" state={{ from: location }} replace />
    );
}

export default RequiredAuth;