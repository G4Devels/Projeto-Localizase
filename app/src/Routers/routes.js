import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PrivateRoutes } from ".";
import { MainHome } from "../components/home_page/main_home";
import { MainLogin } from "../components/login_page/main_login";
import { MainTest } from "../components/test_page/main_test";
import MainRegistration from "../components/registration_page/main_registration";


export const AppRoutes = () => {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<MainLogin />} />
            <Route path="/registro" element={<MainRegistration />}/>
            <Route path="/home" element={<PrivateRoutes />}>
                <Route path="/home" element={<MainHome />} />
            </Route>
            <Route path="/test" element={<PrivateRoutes />}>
                <Route path="/test" element={<MainTest />} />
            </Route>
        </Routes>
    </BrowserRouter>
    );
};