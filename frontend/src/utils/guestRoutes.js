import { Outlet, Navigate } from "react-router-dom";

function guestRoutes({ user, isInitialised }) {
    if (!isInitialised) {
        return <div>Loading...</div>;
    }

    return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default guestRoutes;