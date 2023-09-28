import { useContext } from "react"
import { AuthAccountsContext} from "../contexts/authAccounts"
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
    const {signed} = useContext(AuthAccountsContext);
    return signed ? <Outlet /> : <Navigate to="/login" />;
};