import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const PrivateRoute = ({ children, requiredRoles = [] }) => {
    const isLoggedIn = useAuthStore((state) => state.accessToken);  // Check login status
    const role = useAuthStore((state) => state.role);  // Get user role

    console.log("isLoggedIn:", isLoggedIn);
    console.log("role:", role);

    // If the user is not logged in, redirect to login
    if (!isLoggedIn) {
        return <Navigate to="/login" replace />;
    }

    // If no role restriction, render the children
    if (requiredRoles.length === 0 || requiredRoles.includes(role)) {
        return children;
    }

    // If role doesn't match, redirect to login
    return <Navigate to="/login" replace />;
};

export default PrivateRoute;
