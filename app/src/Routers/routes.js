import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { MainHome } from "../components/home_page/main_home";
import { MainLogin } from "../components/login_page/main_login";


export const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLogin />} />
            <Route path="/home" element={<PrivateRoutes />}>
                <Route path="/home" element={<MainHome />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
};