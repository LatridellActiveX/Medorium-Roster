import MainPage from './pages/main';
import Footer from './layout/footer';
import Header from './layout/header';
import { Route, Routes } from "react-router-dom";
import LoginPage from './pages/login';
import RegestrationPage from './pages/regestration';
import AdminPanelPage from './pages/adminPanel';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from './hooks/useAuth';
import FAQPage from './pages/FAQ';
import ScrollToHashElement from "./ui/scrollToHashElement";

const App: React.FC = () => {
    useAuth();

    return <>
        <Header />
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/regestration" element={<RegestrationPage />} />
            <Route path="/adminPanel" element={<AdminPanelPage />} />
            <Route path="/FAQ" element={<FAQPage />} />
        </Routes>
        <Footer />

        <ToastContainer
            position="bottom-right"
        />
        <ScrollToHashElement />
    </>
};

export default App;