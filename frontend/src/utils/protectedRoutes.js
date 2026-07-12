import { Outlet, Navigate } from "react-router-dom";

function protectedRoutes({ user, isInitialised, children }) {
    if (!isInitialised) {
        return <div>Loading...</div>;
    }

    return user ? <Outlet /> : <Navigate to="/login" replace />;
}
export default protectedRoutes;