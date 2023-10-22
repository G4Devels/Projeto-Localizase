import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const sessionToken = localStorage.getItem("@AuthFirebase:token");
    return (sessionToken != null) ? <Outlet /> : <Navigate to="/" />;
};