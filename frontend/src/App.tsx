import MainPage from './pages/main';
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/login';
import RegistrationPage from './pages/registration';
import AdminPanelPage from './pages/adminPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';
import FAQPage from './pages/FAQ';
import ScrollToHashElement from "./ui/scrollToHashElement";
import RosterPage from './pages/roster';
import PrivacyPolicyPage from './pages/privacyPolicy';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const App: React.FC = () => {
    useAuth();

    return <>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/adminPanel" element={<AdminPanelPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
            <Route path="/roster" element={<RosterPage />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
        </Routes>

        <ToastContainer
            position="bottom-right"
        />
        <ScrollToHashElement />
        <ReactQueryDevtools initialIsOpen={false} />
    </>
};

export default App;