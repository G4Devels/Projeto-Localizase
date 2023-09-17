import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { MainHome } from "../components/home_page/main_home";
import { MainLogin } from "../components/login_page/main_login";
import MainRegistration from "../components/registration_page/main_registration";
import { MainLanding } from "../components/landing_page/main_landing";


export const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/landing" element={<MainLanding />} />
            <Route path="/" element={<MainLogin />} />
            <Route path="/registro" element={<MainRegistration />}/>
            <Route path="/home" element={<PrivateRoutes />}>
                <Route path="/home" element={<MainHome />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
};