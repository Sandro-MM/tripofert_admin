import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children, requiredRoles = [] }) => {
    const isLoggedIn = useAuthStore((state) => state.accessToken);
    const role = useAuthStore((state) => state.role);

    console.log("isLoggedIn:", isLoggedIn);
    console.log("role:", role);


    if (isLoggedIn && role === null) {
        return <div>Loading...</div>;
    }


    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }


    if (requiredRoles.length === 0 || requiredRoles.includes(role)) {
        return children;
    }

    return <Navigate to="/unauthorized" replace />;
};

export default PrivateRoute;
